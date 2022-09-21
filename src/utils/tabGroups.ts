/*
 * タブ一覧を取得
 * 指定した条件のタブを一覧で取得する
 *
 * TODO: 型をanyじゃなくてちゃんと指定する
 */

/*
 * アクティブなウィンドのタブを取得する
 * ※タブが取得できなかった場合は空の配列を返す。
 */
async function getTabs (targetTabConditions: any) {
    console.log("タブを取得します。")
    // TODO タブを取得できた場合とできない場合で処理を分ける。
    const tabs = await chrome.tabs.query(targetTabConditions);
    console.log("表示中のタブ数：" + tabs.length);
    console.log("タブを取得しました。")
    return tabs
    // TODO テスト
};

/*
 * タブ配列をタブIDのリストを返却
 * ※タブが取得できなかった場合は空の配列を返す。
 */
function getTabIdList(targetTabList: any) {
    // TODO 配列からIDを抽出してリストにする
    console.log("タブのIDを取得")
    const tabIdList = Array();
    targetTabList.forEach((tab: any) => {
        tabIdList.push(tab.id);
    });
    console.log("タブのID")
    console.log(tabIdList)
    console.log("タブのIDを取得完了")
    return tabIdList
}

/*
 * タブをグループ化
 * 引数で受け取ったタブを配列ごとにグループ化する
 */
async function groupTabs(tabIdList: number[]) {
    console.log("タブをグループ化")
    if (tabIdList.length > 0){
        const groupId = await chrome.tabs.group({tabIds: tabIdList});
    }
    console.log("タブをグループ化完了")
}

/*
 * タブを全てグループ化
 */
export function groupAllActivateTabs() {
    console.log("タブをすべてグループ化");
    const targetTabConditions: any = {
        currentWindow: true,
        pinned: false,
        url: ['http://*/*', 'https://*/*'],
        groupId: chrome.tabGroups.TAB_GROUP_ID_NONE
    };
    // TODO プロミス地獄解消
    getTabs(targetTabConditions).then((tabs) => {
        const tabIdList = getTabIdList(tabs);
        groupTabs(tabIdList).then(() => {
            console.log("グループ化完了")
        }).catch((error) =>{
            console.log(error)
        });
    }).catch((error) => {
        console.log(error)
    });
    // TODO グループの名前を決めたい
    // TODO グループの色をつけたい
    // TODO テスト
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
    // TODO 関数の書き方あってる、、、？
    // TODO グループ化を解除できるようにしたい
    console.log("グループ化解除開始")
    const targetTabConditions: any = {
        currentWindow: true,
        pinned: false,
        url: ['http://*/*', 'https://*/*'],
    };
    getTabs(targetTabConditions).then((tabs) => {
        const tabIdList = getTabIdList(tabs);
        ungroupTabs(tabIdList).then(() => {
            console.log("グループ化解除完了")
        }).catch((error) =>{
            console.log(error)
        });
    }).catch((error) => {
        console.log(error)
    });
    // フローイメージ
    // TODO 全てのグループを取得
    // TODO 全てのグループからグループIDを取得する
    // TODO グループ化解除
}

