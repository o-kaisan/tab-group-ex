import { Action, ActionType } from '../../common/const/action'
import { type Message } from '../types/message'
import { getCurrentTab } from './tab'

/**
 * 下記のパターンでメッセージを送信するメソッド
 *   - context_script -> popup
 *   - context_script -> background
 *   - popup -> background
 *   - background -> popup
 */
export function sendMessage(msg: Message): void {
    chrome.runtime.sendMessage(msg)
}

/**
 * 下記のパターンでメッセージを送信するメソッド
 *   - popup -> context_script
 *   - background -> context_script
 */
export function sendMessageToTab(tabId: number, msg: Message): void {
    chrome.tabs.sendMessage(tabId, msg)
}

/**
 * 現在のタブに保存処理実行メッセージを送信する
 */
export async function sendSaveMessageToTab(): Promise<void> {
    // スナックバー表示用にメッセージを送信
    const currentTab = await getCurrentTab()
    if (currentTab.id === undefined) return
    sendMessageToTab(currentTab.id, { actionType: ActionType.SAVE_GROUP })
}

/**
 * 現在のタブにグループ化処理実行メッセージを送信する
 */
export async function sendGroupMessageToTab(actionType: Action): Promise<void> {
    // スナックバー表示用にメッセージを送信
    const currentTab = await getCurrentTab()
    if (currentTab.id === undefined) return
    switch (actionType) {
        case ActionType.GROUP_ALL:
            sendMessageToTab(currentTab.id, { actionType: ActionType.GROUP_ALL })
            break;
        case ActionType.GROUP_BY_DOMAIN:
            sendMessageToTab(currentTab.id, { actionType: ActionType.GROUP_BY_DOMAIN })
            break;
        case ActionType.GROUP_BY_CUSTOM_DOMAIN:
            sendMessageToTab(currentTab.id, { actionType: ActionType.GROUP_BY_CUSTOM_DOMAIN })
            break;
        default:
            throw Error("never reach here")
    }
}

/**
 * 現在のタブにグループ化解除処理実行メッセージを送信する
 */
export async function sendUngroupMessageToTab(): Promise<void> {
    // スナックバー表示用にメッセージを送信
    const currentTab = await getCurrentTab()
    if (currentTab.id === undefined) return
    sendMessageToTab(currentTab.id, { actionType: ActionType.UNGROUP_ALL_GROUP })
}

/**
 * 現在のタブにグループ化タブを閉じる処理実行メッセージを送信する
 */
export async function sendCloseGroupMessageToTab(): Promise<void> {
    // スナックバー表示用にメッセージを送信
    const currentTab = await getCurrentTab()
    if (currentTab.id === undefined) return
    sendMessageToTab(currentTab.id, { actionType: ActionType.CLOSE_GROUP })
}

/**
 * 現在のタブにグループ化タブを閉じる処理実行メッセージを送信する
 */
export async function sendCloseTabMessageToTab(): Promise<void> {
    // スナックバー表示用にメッセージを送信
    const currentTab = await getCurrentTab()
    if (currentTab.id === undefined) return
    sendMessageToTab(currentTab.id, { actionType: ActionType.CLOSE_TAB })
}

/**
 * 現在のタブにタブグループ復元処理実行メッセージを送信する
 */
export async function sendRestoreGroupMessageToTab(): Promise<void> {
    // スナックバー表示用にメッセージを送信
    const currentTab = await getCurrentTab()
    if (currentTab.id === undefined) return
    sendMessageToTab(currentTab.id, { actionType: ActionType.RESTORE_GROUP })
}

/**
 * 現在のタブにタブ復元処理実行メッセージを送信する
 */
export async function sendRestoreTabMessageToTab(): Promise<void> {
    // スナックバー表示用にメッセージを送信
    const currentTab = await getCurrentTab()
    if (currentTab.id === undefined) return
    sendMessageToTab(currentTab.id, { actionType: ActionType.RESTORE_TAB })
}


/**
 * 現在のタブにタブグループの中のタブ削除処理実行メッセージを送信する
 */
export async function sendDeleteSavedGroupMessageToTab(): Promise<void> {
    // スナックバー表示用にメッセージを送信
    const currentTab = await getCurrentTab()
    if (currentTab.id === undefined) return
    sendMessageToTab(currentTab.id, { actionType: ActionType.DELETE_GROUP })
}

/**
 * 現在のタブにタブグループ削除処理実行メッセージを送信する
 */
export async function sendDeleteSavedTabMessageToTab(): Promise<void> {
    // スナックバー表示用にメッセージを送信
    const currentTab = await getCurrentTab()
    if (currentTab.id === undefined) return
    sendMessageToTab(currentTab.id, { actionType: ActionType.DELETE_TAB })
}
