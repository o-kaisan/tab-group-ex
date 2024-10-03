/*
 * タブのグループ化関連のユーティリティ
 */
import type { GroupRule } from '../types/groupRule'
import * as url from '../utils/url'
import { GROUP_MODE } from '../types/groupMode'
import { getTabs, getTabsWithoutGrouped, getTabIdList, getAllTabs } from './tab'
import { getGroupRules } from './groupRule'
import type { Url } from '../types/savedTabGroupInfo'

type DomainMap = Record<string, number[]>

/*
 * タブをグループ化
 */
export async function groupTabs(groupMode: string): Promise<void> {
    switch (groupMode) {
        case GROUP_MODE.domain: {
            const tabs = await getAllTabs()
            const domainMap = getTabIdsFromCurrentTabsByDomain(tabs)
            await groupTabsByDomain(domainMap)
            return
        }

        case GROUP_MODE.customDomain: {
            const tabs = await getAllTabs()
            const groupRules = await getGroupRules()
            if (groupRules === undefined || groupRules.length <= 0) {
                return
            }
            const groupRuleList: string[] = []
            groupRules.forEach((rule: GroupRule) => {
                groupRuleList.push(rule.domain)
            })
            const domainMap = getTabIdsFromCurrentTabsByDomain(tabs, groupRules)
            await groupTabsByDomain(domainMap)
            return
        }

        case GROUP_MODE.all: {
            const tabs = await getTabsWithoutGrouped()
            await groupAllCurrentTabs(tabs)
            return
        }

        default:
            console.error('Failed to group tabs (invalid group mode) groupMode=%s', groupMode)
            break
    }
}

/*
 * 現在のタブからドメイン名とタブIDのマッピングしたオブジェクトを返す。
 * groupRuleが指定されていると、groupRuleのドメイン名とマッチしたオブジェクトのみを返す
 */
function getTabIdsFromCurrentTabsByDomain(tabs: chrome.tabs.Tab[], groupRule?: GroupRule[]): DomainMap {
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
            const tabIds = domainMap[domain.domain]
            if (tabIds !== undefined && tabIds.length > 0) {
                customDomainMap[domain.domain] = tabIds
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
        console.log('Failed to update title :%d', err)
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
 *  全てのタブグループを解除する
 */
export async function ungroupAllTabs(): Promise<void> {
    const tabs = await getAllTabs()
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
export async function getUrlsFromTabGroup(tabGroupId: number): Promise<Url[]> {
    const targetTabGroupConditions = {
        groupId: tabGroupId
    }
    const urls: Url[] = []
    const tabs = await getTabs(targetTabGroupConditions)
    tabs.forEach((tab) => {
        if (tab.url !== undefined) {
            const url: Url = {title: tab.title,  url: tab.url, favIconUrl: tab.favIconUrl}
            urls.push(url)
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
