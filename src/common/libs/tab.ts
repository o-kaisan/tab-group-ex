/*
 * 指定した条件でタブを取得する
 * ※タブが取得できなかった場合は空の配列を返す。
 */
export async function getTabs(targetTabConditions: chrome.tabs.QueryInfo): Promise<chrome.tabs.Tab[]> {
    const tabs: chrome.tabs.Tab[] = await chrome.tabs.query(targetTabConditions)
    return tabs
}

/*
 * グループ化されたタブを含む全てのタブを取得する
 */
export async function getAllTabs(): Promise<chrome.tabs.Tab[]> {
    const targetTabConditions: chrome.tabs.QueryInfo = {
        currentWindow: true,
        pinned: false,
        url: ['http://*/*', 'https://*/*']
    }
    const tabs: chrome.tabs.Tab[] = await getTabs(targetTabConditions)
    return tabs
}

/*
 * 指定したタブグループのタブ一覧を取得する
 */
export async function getTabsByGroupId(tabGroupId: number): Promise<chrome.tabs.Tab[]> {
    const targetTabConditions: chrome.tabs.QueryInfo = {
        currentWindow: true,
        pinned: false,
        groupId: tabGroupId,
        url: ['http://*/*', 'https://*/*']
    }
    const tabs: chrome.tabs.Tab[] = await getTabs(targetTabConditions)
    return tabs
}

/*
 * グループ化されていないタブを取得する
 */
export async function getTabsWithoutGrouped(): Promise<chrome.tabs.Tab[]> {
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


/*
 * タブを選択状態に更新する
 */
export async function activedTab(tabId: number): Promise<chrome.tabs.Tab> {
    const targetTabConditions: chrome.tabs.UpdateProperties = {
        active: true
    }
    return await chrome.tabs.update(tabId, targetTabConditions)
}

/*
 * タブを削除する
 */
export async function removeTab(tabId: number): Promise<void> {
    await chrome.tabs.remove(tabId)
}

/*
 * 指定したurlでタブを新規に開く
 */
export async function createTab(url: string): Promise<void> {
    const createProperties: chrome.tabs.CreateProperties = {
        url,
        active: true,
    }
    await chrome.tabs.create(createProperties)
}