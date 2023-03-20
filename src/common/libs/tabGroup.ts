/*
 * タブのグループ化関連のユーティリティ
 */
import type { GroupRule } from '../types/groupRule'
import * as url from '../utils/url'
import { GROUP_MODE } from '../const/groupMode'
import { getTabs, getTabsWithoutGrouped, getTabIdList, getAllTabs } from './tab'
import { getGroupMode } from './groupMode'
import { getGroupRule } from './groupRule'

/*
 * タブをグループ化
 */
export async function groupTabs(groupMode?: string): Promise<void> {
    if (groupMode === undefined) {
        groupMode = await getGroupMode()
    }

    if (groupMode === GROUP_MODE.domain) {
        await groupCurrentTabsByDomain()
    }

    if (groupMode === GROUP_MODE.customDomain) {
        const groupRule = await getGroupRule()
        if (groupRule === undefined) {
            return
        }

        const groupRuleList: string[] = []
        groupRule.forEach((rule: GroupRule) => {
            groupRuleList.push(rule.domain)
        })
        await groupCurrentTabsByCustom(groupRuleList)
    }

    if (groupMode === GROUP_MODE.all) {
        await groupAllCurrentTabs()
    }
}

/*
 * タブをドメインごとにグループ化
 * ※サブドメインも含むグループ化となる
 * ※グループ化されたタブも含む
 */
async function groupCurrentTabsByDomain(): Promise<void> {
    const tabs: chrome.tabs.Tab[] = await getAllTabs()
    // ドメインを取得
    const domainMap: Record<string, number[]> = {}
    const domains = []
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
            domains.push(domain)
        }
        const targetId = tabs[i].id
        if (targetId === undefined) {
            continue
        }
        domainMap[domain].push(targetId)
    }
    // ドメイン分グループ化を繰り返す
    await Promise.all(
        // 再グループ化
        domains.map(async (domain) => {
            const groupIds: number[] = domainMap[domain]
            await updateTabGroups(groupIds, domain)
        })
    )
}

/*
 * カスタムルールに従ってタブをグループ化
 * ※サブドメインも含むグループ化となる
 * ※グループ化されたタブも含む
 */
async function groupCurrentTabsByCustom(groupRules: string[]): Promise<void> {
    const tabs: chrome.tabs.Tab[] = await getAllTabs()
    // ルールにしたがってグループ化
    const domainMap: Record<string, number[]> = {}
    const domains: string[] = []
    if (groupRules.length > 0) {
        groupRules.forEach((domain) => {
            for (let i: number = 0; i < tabs.length; i++) {
                const targetUrl = tabs[i].url
                if (targetUrl === undefined) {
                    continue
                }
                const tabDomain = url.getDomainNameIgnoreSubDomain(targetUrl)
                if (tabDomain === undefined) {
                    continue
                }
                // タブがドメインルールに含まれてるか確認
                if (domain !== tabDomain) {
                    continue
                }
                if (domainMap[domain] === undefined) {
                    domainMap[domain] = []
                    domains.push(domain)
                }
                const targetId = tabs[i].id
                if (targetId === undefined) {
                    continue
                }
                domainMap[domain].push(targetId)
            }
        })
        // ドメイン分グループ化を繰り返す
        await Promise.all(
            domains.map(async (domain) => {
                const groupIds: number[] = domainMap[domain]
                try {
                    await updateTabGroups(groupIds, domain)
                } catch (err) {
                    console.log('failed to group by custom rule :', err)
                }
            })
        )
    }
}

/*
 * タブを全てグループ化
 */
async function groupAllCurrentTabs(): Promise<void> {
    const tabs = await getTabsWithoutGrouped()
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
async function updateTabGroups(tabIdList: number[], title: string): Promise<void> {
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
 * 指定したグループ化を解除
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
 * アクティブなウィドウのタブグループ一覧を取得
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
export async function getTabUrlsFromTabGroup(tabGroupId: number): Promise<string[]> {
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
