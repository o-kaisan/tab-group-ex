/*
 * タブのグループ化関連のユーティリティ
 */

export interface SavedTabGroupInfo {
    // タブグループのId
    // もしかすると保存するのにタブグループIDだけで足りないかも

    // ※ 保存時のグループIDとタブグループのタイトルでユニークにしているが被る可能性は0ではない。
    // ストレージ保存用のタイプ
    type: string
    // 保存時のグループID
    id: number
    // タブグループのタイトル
    title: string | undefined
    // タブグループに保存されているタブ
    urlList: string[]
  }


/*
 * 指定した条件でタブを取得する
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
async function groupTabs(tabIdList: number[], title: string="") {
    if (tabIdList.length > 0){
        const groupId: number = await chrome.tabs.group({tabIds: tabIdList});
        if (title == "") {
            title = groupId.toString()
        }
        chrome.tabGroups.update(groupId, {
            collapsed: true,
            title: title
        });
    }
}

/*
 * タブを全てグループ化
 */
export async function groupAllActivateTabs() {
    const targetTabConditions: chrome.tabs.QueryInfo = {
        currentWindow: true,
        pinned: false,
        url: ['http://*/*', 'https://*/*'],
        groupId: chrome.tabGroups.TAB_GROUP_ID_NONE
    };
    const tabs = await getTabs(targetTabConditions)
    const tabIdList: number[] = getTabIdList(tabs);
    await groupTabs(tabIdList)
}

/*
 * 指定したグループ化を解除
 */
export async function ungroupTabs(tabGroupId: number) {
    const targetTabConditions: chrome.tabs.QueryInfo = {
        currentWindow: true,
        pinned: false,
        groupId: tabGroupId
    };
    const tabs = await getTabs(targetTabConditions)
    const tabIdList: number[] = getTabIdList(tabs);

    if (tabIdList.length == 0) return
    await chrome.tabs.ungroup(tabIdList);
}

/*
 * 全てのグループ化を解除
 */

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


/*
 *　タブグループを開/閉を切り替える
 */
export async function toggleTabGroupCollapsed(tabGroupId: number, collapsed: boolean) {
    const updateProperties: chrome.tabGroups.UpdateProperties  = {
        collapsed: collapsed,
    }
    await chrome.tabGroups.update(tabGroupId, updateProperties);
}


async function getTabUrls(tabGroupId:number) {
   /*
    * タブグループからタブのURL一覧を取得ｓるう
    */
    const targetTabGroupConditions = {
        groupId: tabGroupId
    }
    var urls = Array()
    const tabs = await getTabs(targetTabGroupConditions)
    tabs.map((tab) => {urls.push(tab.url)})
    console.log(urls)
    return urls
}

export async function saveTabGroup(tabGroupId:number, tabGroupTitle: string){
   /*
    * タブグループを保存する
    */
    const urls = await getTabUrls(tabGroupId)
    if (urls.length == 0){
        return
    }
    const saveTabGroupInfo: SavedTabGroupInfo = {
    type: "TGEX",
    id: tabGroupId,
    title: tabGroupTitle,
    urlList: urls,
    }

    // タブグループがundifinedだったらストレージに保存せずに返却
    if (tabGroupTitle == undefined) return
    const storageTitle: string = "TG_" + tabGroupTitle + tabGroupId
    console.log(saveTabGroupInfo)
    await chrome.storage.local.set({[storageTitle]: saveTabGroupInfo})
}

export async function deleteTabGroup(tabgroupTitle: string, tabGroupId:number) {
   /*
    * タブグループをストレージから削除する
    */
    const targetTabGroup: string = "TG_" + tabgroupTitle + tabGroupId
    await chrome.storage.local.remove(targetTabGroup)
}

export async function getAllSavedTabGroup() {
    /*
     * ローカルストレージから保存されたタブグループを取得する
     */
    const storageData = await chrome.storage.local.get(null);
    const ret: SavedTabGroupInfo[] = Array()
    Object.keys(storageData).forEach(key => {
        if (storageData[key].type == "TGEX") {
            ret.push(storageData[key])
        }
    })
    return ret

}

async function restoreTab(url: string) {
    const createProperties: chrome.tabs.CreateProperties = {
        active: false,
        url: url
    }
    const tab = await chrome.tabs.create(createProperties)
    return tab.id
}

export async function restoreTabGroup(tabgroupTitle: string | undefined, urlList: string[]) {
   /*
    *　指定したタブグループを復元する
    */
    // 一通りタブを開く　chrome.tabs.create
    // 新しく開いたタブのIDをリスト化する
    // もともと設定されているグループの名前でグループ化する
    // 新しくタブグループを作成するとsavedTabGroupのidが変わるからupdateすること

    const tabIdList = Array()
    const result = await Promise.all(urlList.map(async (url) => {
        const tabId = restoreTab(url)
        return tabId
    }));
    result.map((tabId) => {
        if (tabId !== undefined){
            tabIdList.push(tabId)
        }
    })
    await groupTabs(tabIdList, tabgroupTitle)
}

export async function closeTabGroup(tabGroupId: number) {
    const targetTabConditions: chrome.tabs.QueryInfo = {
        groupId: tabGroupId
    }
    const tabs = await getTabs(targetTabConditions)
    const tabsIds = await getTabIdList(tabs)
    await chrome.tabs.remove(tabsIds)
}

export async function updateTabGroupName(tabGroupId: number, tabGroupTitle:string) {
    const updateProperties: chrome.tabGroups.UpdateProperties  = {
        title: tabGroupTitle,
    }
    await chrome.tabGroups.update(tabGroupId, updateProperties);
}