

// ストレージのキー
const ACTION_NOTIFICATION_KEY: string = "actionNotification"

/*
 * ローカルストレージにアクション通知の設定を保存する
 * ローカルストレージにbooleanを保存するとstringになってしまうので管理しやすいように数値で保存する
 */
export async function saveActionNotificationSetting(isActionNotificationEnabled: boolean): Promise<void> {
    let storageData: number = 0
    if (isActionNotificationEnabled) {
        storageData = 1
    }
    await chrome.storage.local.set({ actionNotification: storageData })
}

/*
 * ローカルストレージに保存されているアクション通知の設定を取得する
 * ローカルストレージの数値データをbooleanで返却する
 */
export async function getActionNotificationSetting(): Promise<boolean> {
    const storageData: any = await chrome.storage.local.get(ACTION_NOTIFICATION_KEY)
    const isActionNotificationEnabled = storageData.actionNotification

    switch (true) {
        case isActionNotificationEnabled === 0:
            return false
        case isActionNotificationEnabled === 1:
            return true
        default:
            // 設定が不正な場合は1で上書き保存し、Trueを返す
            await chrome.storage.local.set({ [ACTION_NOTIFICATION_KEY]: 1 })
            return true
    }
}