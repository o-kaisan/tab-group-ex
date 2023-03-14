import { GROUP_MODE } from '../const/groupMode'

/*
 * ローカルストレージにタブグループの設定を保存
 */
export async function saveGroupModeSetting(groupMode: string): Promise<void> {
    await chrome.storage.local.set({ groupMode })
}

/*
 * ローカルストレージに保存されたタブグループの設定を取得する
 */
export async function getSavedGroupModeSetting(): Promise<string> {
    const groupModeKV = await chrome.storage.local.get('groupMode')
    let ret: string = groupModeKV.groupMode
    if (ret === undefined) {
        ret = GROUP_MODE.all
    }
    return ret
}
