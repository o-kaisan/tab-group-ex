import { GROUP_MODE } from '../types/groupMode'

const GROUP_MODE_KEY: string = "groupMode"

/*
 * ローカルストレージにタブグループの設定を保存
 */
export async function saveGroupMode(groupMode: string): Promise<void> {
    await chrome.storage.local.set({ groupMode })
}

/*
 * ローカルストレージに保存されたタブグループの設定を取得する
 */
export async function getGroupMode(): Promise<string> {
    const storageData = await chrome.storage.local.get(GROUP_MODE_KEY)
    let ret: any = storageData.groupMode
    if (ret === undefined) {
        ret = GROUP_MODE.all
    }
    return ret
}
