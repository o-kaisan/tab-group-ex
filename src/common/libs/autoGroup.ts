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
