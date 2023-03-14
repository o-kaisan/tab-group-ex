
/*
 * ストレージに自動グルーピング設定を保存
 */
export async function saveAutoGroupingSetting(autoGrouping: boolean): Promise<void> {
    await chrome.storage.local.set({ autoGrouping })
}

/*
 * ストレージに保存された自動グルーピング設定を取得
 */
export async function getAutoGroupingSetting(): Promise<boolean> {
    const autoGroupingKV = await chrome.storage.local.get('autoGrouping')
    return autoGroupingKV.autoGrouping
}