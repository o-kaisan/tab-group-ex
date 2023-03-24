/*
 * タブのグループ化関連のユーティリティ
 */
import type { GroupRule } from '../types/groupRule'
import * as url from '../utils/url'
import { GROUP_MODE } from '../types/groupMode'
import { getTabs, getTabsWithoutGrouped, getTabIdList, getAllTabs } from './tab'
import { getGroupMode } from './groupMode'
import { getGroupRule } from './groupRule'

type DomainMap = Record<string, number[]>

/*
 * タブをグループ化
 */
export async function groupTabs(groupMode?: string): Promise<void> {
    if (groupMode === undefined) {
        groupMode = await getGroupMode()
    }

    switch (groupMode) {
        case GROUP_MODE.domain: {
            const tabs: chrome.tabs.Tab[] = await getAllTabs()
            await groupCurrentTabsByDomain(tabs)
            return
        }
        case GROUP_MODE.customDomain: {
            const tabs: chrome.tabs.Tab[] = await getAllTabs()
            const groupRule = await getGroupRule()
            if (groupRule === undefined) {
                return
            }
            const groupRuleList: string[] = []
            groupRule.forEach((rule: GroupRule) => {
                groupRuleList.push(rule.domain)
            })
            await groupCurrentTabsByCustomDomain(tabs, groupRuleList)
            return
        }
        case GROUP_MODE.all: {
            const tabs = await getTabsWithoutGrouped()
            await groupAllCurrentTabs(tabs)
            return
        }
        default:
            console.error("Failed to group tabs (invalid group mode) groupMode=%s", groupMode)
            break;
    }
}

/*
 * タブをドメインごとにグループ化
 * ※サブドメインも含むグループ化となる
 * ※グループ化されたタブも含む
 */
async function groupCurrentTabsByDomain(tabs: chrome.tabs.Tab[]): Promise<void> {
    const domainMap = getTabIdsFromCurrentTabsByDomain(tabs)
    await groupTabsByDomain(domainMap)
}

/*
* カスタムルールに従ってタブをグループ化
* ※サブドメインも含むグループ化となる
* ※グループ化されたタブも含む
*/
async function groupCurrentTabsByCustomDomain(tabs: chrome.tabs.Tab[], groupRules: string[]): Promise<void> {
    if (groupRules.length <= 0) {
        return
    }
    const domainMap = getTabIdsFromCurrentTabsByDomain(tabs, groupRules)
    await groupTabsByDomain(domainMap)
}

/*
 * 現在のタブからドメイン名とタブIDのマッピングしたオブジェクトを返す。
 * groupRuleが指定されていると、groupRuleのドメイン名とマッチしたオブジェクトのみを返す
 */
function getTabIdsFromCurrentTabsByDomain(tabs: chrome.tabs.Tab[], groupRule?: string[]): DomainMap {
    const domainMap: DomainMap = {}

    for (let i: number = 0; i < tabs.length; i++) {
        const targetUrl = tabs[i].url
        if (targetUrl === undefined) {
            continue
        }

        const domain = url.getDomainNameIgnoreSubDomain(targetUrl)
        if (domain === undefined) {
            continue
        }

        if (domainMap[domain] === undefined) {
            domainMap[domain] = []
        }

        const targetId = tabs[i].id
        if (targetId === undefined) {
            continue
        }
        domainMap[domain].push(targetId)
    }

    if (groupRule !== undefined && groupRule.length > 0) {
        const customDomainMap: DomainMap = {}
        groupRule.forEach((domain) => {
            const tabIds = domainMap[domain]
            if (tabIds.length > 0) {
                customDomainMap[domain] = tabIds
            }
        })
        return customDomainMap
    }

    return domainMap
}

async function groupTabsByDomain(domainMap: DomainMap): Promise<void> {
    await Promise.all(
        Object.keys(domainMap).map(async (domain) => {
            const groupIds: number[] = domainMap[domain]
            try {
                await updateOrCreateTabGroups(groupIds, domain)
            } catch (err) {
                console.error('failed to group by custom rule :', err)
            }
        })
    )
}

/*
 * タブを全てグループ化
 */
async function groupAllCurrentTabs(tabs: chrome.tabs.Tab[]): Promise<void> {
    const tabIdList: number[] = getTabIdList(tabs)
    await createTabGroups(tabIdList)
}

/*
 * 新しくタブをグループ化する
 */
export async function createTabGroups(tabIdList: number[], title: string = ''): Promise<number> {
    if (tabIdList.length === 0) {
        return -1 // IDになり得ないマイナスの値を返す
    }
    const groupId = await chrome.tabs.group({ tabIds: tabIdList })
    if (title === '') {
        title = groupId.toString()
    }
    try {
        void chrome.tabGroups.update(groupId, {
            collapsed: false,
            title
        })
    } catch (err) {
        console.log('failed to update title :%d', err)
    }
    return groupId
}

/*
 * タブグループを更新する
 */
async function updateOrCreateTabGroups(tabIdList: number[], title: string): Promise<void> {
    if (tabIdList.length === 0) {
        return
    }
    let groupId: number | undefined = await getTabGroupIdByTitle(title)

    // 指定したグループ名がなければ新規作成
    if (groupId === undefined) {
        groupId = await createTabGroups(tabIdList, title)
        return
    }
    // グループが既に存在していれば追加する
    await chrome.tabs.group({ groupId, tabIds: tabIdList })
}

/*
 * タブグループ名にヒットしたタブグループのIDを返す
 * ※同じタブグループ名の場合は最初にヒットしたものとなる
 */
async function getTabGroupIdByTitle(title: string): Promise<number | undefined> {
    const tabgroups: chrome.tabGroups.TabGroup[] = await getAllTabGroupList()
    let tabGroupId: number | undefined
    tabgroups.forEach((tabgroup) => {
        if (tabgroup.title === title) {
            tabGroupId = tabgroup.id
        }
    })
    return tabGroupId
}

/*
 * 指定したタブグループのグループ化を解除する
 */
export async function ungroupTabs(tabGroupId: number): Promise<void> {
    const targetTabConditions: chrome.tabs.QueryInfo = {
        currentWindow: true,
        pinned: false,
        groupId: tabGroupId
    }
    const tabs = await getTabs(targetTabConditions)
    const tabIdList: number[] = getTabIdList(tabs)

    if (tabIdList.length === 0) return
    await chrome.tabs.ungroup(tabIdList)
}

/*
 * アクティブなウィドウのタブグループ一覧を取得する
 */
export async function getAllTabGroupList(): Promise<chrome.tabGroups.TabGroup[]> {
    const targetTabGroupConditions: chrome.tabGroups.QueryInfo = {
        windowId: chrome.windows.WINDOW_ID_CURRENT
    }
    const ret: chrome.tabGroups.TabGroup[] = await getTabGroupList(targetTabGroupConditions)
    return ret
}

/*
 * タブグループ一覧を取得
 * タググループが存在しない場合は空のリストを返す
 */
async function getTabGroupList(
    targetTabGroupConditions: chrome.tabGroups.QueryInfo
): Promise<chrome.tabGroups.TabGroup[]> {
    const tabGroupList: chrome.tabGroups.TabGroup[] = await chrome.tabGroups.query(targetTabGroupConditions)
    return tabGroupList
}

/*
 * タブグループを開/閉を切り替える
 */
export async function toggleTabGroupCollapsed(tabGroupId: number, collapsed: boolean): Promise<void> {
    const updateProperties: chrome.tabGroups.UpdateProperties = {
        collapsed
    }
    await chrome.tabGroups.update(tabGroupId, updateProperties)
}

/*
 * タブグループからタブのURL一覧を取得する
 */
export async function getUrlsFromTabGroup(tabGroupId: number): Promise<string[]> {
    const targetTabGroupConditions = {
        groupId: tabGroupId
    }
    const urls: string[] = []
    const tabs = await getTabs(targetTabGroupConditions)
    tabs.forEach((tab) => {
        if (tab.url !== undefined) {
            urls.push(tab.url)
        }
    })
    return urls
}

/*
 * タブグループを閉じる
 */
export async function closeTabGroup(tabGroupId: number): Promise<void> {
    const targetTabConditions: chrome.tabs.QueryInfo = {
        groupId: tabGroupId
    }
    const tabs = await getTabs(targetTabConditions)
    const tabsIds = getTabIdList(tabs)
    await chrome.tabs.remove(tabsIds)
}

/*
 * タブグループの名前を更新する
 */
export async function updateTabGroupName(tabGroupId: number, tabGroupTitle: string): Promise<void> {
    const updateProperties: chrome.tabGroups.UpdateProperties = {
        title: tabGroupTitle
    }
    await chrome.tabGroups.update(tabGroupId, updateProperties)
}
