/*
 * タブのグループ化関連のユーティリティ
 */

/*
 * アクティブなウィンドのタブを取得する
 * ※タブが取得できなかった場合は空の配列を返す。
 */
async function getTabs (targetTabConditions: chrome.tabs.QueryInfo) {
    const tabs: chrome.tabs.Tab[] = await chrome.tabs.query(targetTabConditions);
    return tabs
};

/*
 * タブ配列をタブIDのリストを返却
 * ※タブが取得できなかった場合は空の配列を返す。
 */
function getTabIdList(targetTabList: any) {
    const tabIdList: number[] = Array();
    targetTabList.forEach((tab: any) => {
        tabIdList.push(tab.id);
    });
    return tabIdList
}

/*
 * タブをグループ化
 * 引数で受け取ったタブを配列ごとにグループ化する
 */
async function groupTabs(tabIdList: number[], title: string) {
    if (tabIdList.length > 0){
        const groupId: number = await chrome.tabs.group({tabIds: tabIdList});
        chrome.tabGroups.update(groupId, {
            collapsed: true,
            title: title
        });
    }
}

/*
 * タブを全てグループ化
 */
export function groupAllActivateTabs() {
    const targetTabConditions: chrome.tabs.QueryInfo = {
        currentWindow: true,
        pinned: false,
        url: ['http://*/*', 'https://*/*'],
        groupId: chrome.tabGroups.TAB_GROUP_ID_NONE
    };
    // TODO プロミス地獄解消
    getTabs(targetTabConditions).then((tabs) => {
        const tabIdList: number[] = getTabIdList(tabs);
        const title: string = "Group"
        groupTabs(tabIdList, title).then(() => {
        }).catch((error) =>{
            console.log(error)
        });
    }).catch((error) => {
        console.log(error)
    });
}

/*
 * グループ化を解除
 */
async function ungroupTabs(tabIdList: number[]) {
    if (tabIdList.length > 0){
        const groupId = await chrome.tabs.ungroup(tabIdList);
    }
}

/*
 * 全てのグループ化を解除
 */
export function ungroupAllTabs() {
    const targetTabConditions: chrome.tabs.QueryInfo = {
        currentWindow: true,
        pinned: false,
        url: ['http://*/*', 'https://*/*'],
    };
    getTabs(targetTabConditions).then((tabs) => {
        const tabIdList: number[] = getTabIdList(tabs);
        ungroupTabs(tabIdList).then(() => {
        }).catch((error) =>{
            console.log(error)
        });
    }).catch((error) => {
        console.log(error)
    });
}

/*
 * アクティブなウィドウのタブグループ一覧を取得
 */
export async function getAllTabGroupList() {
    const targetTabGroupConditions: chrome.tabGroups.QueryInfo = {
        windowId: chrome.windows.WINDOW_ID_CURRENT
    }
    const ret:chrome.tabGroups.TabGroup[] = await getTabGroupList(targetTabGroupConditions)
    return ret
}

/*
 * タブグループ一覧を取得
 * タググループが存在しない場合は空のリストを返す
 */
 async function getTabGroupList(targetTabGroupConditions: chrome.tabGroups.QueryInfo) {
    const tabGroupList: chrome.tabGroups.TabGroup[] = await chrome.tabGroups.query(targetTabGroupConditions);
    return tabGroupList
}

