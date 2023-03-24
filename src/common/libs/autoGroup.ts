import { GROUP_MODE } from '../types/groupMode'
import { groupTabs } from './tabGroup'

/*
 * ストレージに自動グルーピング設定を保存
 */
export async function saveAutoGroup(currentAutoGroup: boolean): Promise<void> {
    await chrome.storage.local.set({ autoGroup: currentAutoGroup })
}

/*
 * ストレージに保存された自動グルーピング設定を取得
 */
export async function getAutoGroup(): Promise<boolean> {
    const autoGroupKV = await chrome.storage.local.get('autoGroup')
    if (autoGroupKV.autoGroup === undefined) {
        return false
    }
    return autoGroupKV.autoGroup
}

/*
 * 自動グループ処理
 * 以下のグループモードのみ有効
 * - Domain
 * - Custom Domain
 */
export async function runAutoGroup(groupMode: string, autoGroup: boolean): Promise<void> {
    if (groupMode !== GROUP_MODE.domain && groupMode !== GROUP_MODE.customDomain) {
        return
    }

    if (autoGroup) {
        groupTabs()
            .then()
            .catch((error) => {
                console.log(error)
            })
    }
}
