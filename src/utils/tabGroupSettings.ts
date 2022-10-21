/*
 * タブグループの設定を管理する
 */
export async function saveGroupMode (groupMode: string) {
    /*
     * タブグループの設定をストレージに保存
     */
    await chrome.storage.local.set({"groupMode": groupMode});
}

export async function getSavedGroupMode() {
    const groupMode = await chrome.storage.local.get("groupMode")
    let ret = groupMode.groupMode
    if (ret == undefined) {
        ret = "Default"
    }
    return ret
}
