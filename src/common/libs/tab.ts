/*
 * 指定した条件でタブを取得する
 * ※タブが取得できなかった場合は空の配列を返す。
 */
export async function getTabs(targetTabConditions: chrome.tabs.QueryInfo): Promise<chrome.tabs.Tab[]> {
    const tabs: chrome.tabs.Tab[] = await chrome.tabs.query(targetTabConditions)
    return tabs
}

/*
 * グループ化されていないタブを取得する
 */
export async function getNoneGroupedTabs(): Promise<chrome.tabs.Tab[]> {
    const targetTabConditions: chrome.tabs.QueryInfo = {
        currentWindow: true,
        pinned: false,
        url: ['http://*/*', 'https://*/*'],
        groupId: chrome.tabGroups.TAB_GROUP_ID_NONE
    }
    const tabs: chrome.tabs.Tab[] = await getTabs(targetTabConditions)
    return tabs
}

/*
 * タブ配列をタブIDのリストを返却
 * ※タブが取得できなかった場合は空の配列を返す。
 */
export function getTabIdList(targetTabList: chrome.tabs.Tab[]): number[] {
    const tabIdList: number[] = []
    targetTabList.forEach((tab: chrome.tabs.Tab) => {
        if (tab.id !== undefined) {
            tabIdList.push(tab.id)
        }
    })
    return tabIdList
}
