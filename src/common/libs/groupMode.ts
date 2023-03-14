import { GROUP_MODE } from '../const/groupMode'

/*
 * タブグループの設定を管理する
 */
export async function saveGroupMode(groupMode: string): Promise<void> {
    /*
     * タブグループの設定をストレージに保存
     */
    await chrome.storage.local.set({ groupMode })
}

export async function getSavedGroupMode(): Promise<string> {
    const groupModeKV = await chrome.storage.local.get('groupMode')
    let ret: string = groupModeKV.groupMode
    if (ret === undefined) {
        ret = GROUP_MODE.all
    }
    return ret
}
