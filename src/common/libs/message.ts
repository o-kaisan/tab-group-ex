import { ActionType } from '../../common/const/action'
import { type Message } from '../types/message'
import { getCurrentTab } from './tab'

/**
 * 下記のパターンでメッセージを送信する
 *   - context_script -> popup
 *   - context_script -> background
 *   - popup -> background
 *   - background -> popup
 */
export function sendMessage(msg: Message): void {
    chrome.runtime.sendMessage(msg)
}

/**
 * 下記のパターンでメッセージを送信する
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
    sendMessageToTab(currentTab.id, { actionType: ActionType.save })
}

/**
 * 現在のタブにグループ化処理実行メッセージを送信する
 */
export async function sendGroupMessageToTab(actionType: string): Promise<void> {
    // スナックバー表示用にメッセージを送信
    const currentTab = await getCurrentTab()
    if (currentTab.id === undefined) return
    switch (actionType) {
        case ActionType.groupAll:
            sendMessageToTab(currentTab.id, { actionType: ActionType.groupAll })
            break;
        case ActionType.groupByDomain:
            sendMessageToTab(currentTab.id, { actionType: ActionType.groupByDomain })
            break;
        case ActionType.groupByCustomDomain:
            sendMessageToTab(currentTab.id, { actionType: ActionType.groupByCustomDomain })
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
    sendMessageToTab(currentTab.id, { actionType: ActionType.ungroupAll })
}

/**
 * 現在のタブにグループ化タブを閉じる処理実行メッセージを送信する
 */
export async function sendCloseGroupMessageToTab(): Promise<void> {
    // スナックバー表示用にメッセージを送信
    const currentTab = await getCurrentTab()
    if (currentTab.id === undefined) return
    sendMessageToTab(currentTab.id, { actionType: ActionType.closeGroup })
}

/**
 * 現在のタブにグループ化タブを閉じる処理実行メッセージを送信する
 */
export async function sendCloseTabMessageToTab(): Promise<void> {
    // スナックバー表示用にメッセージを送信
    const currentTab = await getCurrentTab()
    if (currentTab.id === undefined) return
    sendMessageToTab(currentTab.id, { actionType: ActionType.closeTab })
}

/**
 * 現在のタブにタブグループ復元処理実行メッセージを送信する
 */
export async function sendRestoreGroupMessageToTab(): Promise<void> {
    // スナックバー表示用にメッセージを送信
    const currentTab = await getCurrentTab()
    if (currentTab.id === undefined) return
    sendMessageToTab(currentTab.id, { actionType: ActionType.restoreGroup })
}

/**
 * 現在のタブにタブ復元処理実行メッセージを送信する
 */
export async function sendRestoreTabMessageToTab(): Promise<void> {
    // スナックバー表示用にメッセージを送信
    const currentTab = await getCurrentTab()
    if (currentTab.id === undefined) return
    sendMessageToTab(currentTab.id, { actionType: ActionType.restoreTab })
}


/**
 * 現在のタブにタブグループの中のタブ削除処理実行メッセージを送信する
 */
export async function sendDeleteSavedGroupMessageToTab(): Promise<void> {
    // スナックバー表示用にメッセージを送信
    const currentTab = await getCurrentTab()
    if (currentTab.id === undefined) return
    sendMessageToTab(currentTab.id, { actionType: ActionType.deleteGroup })
}

/**
 * 現在のタブにタブグループ削除処理実行メッセージを送信する
 */
export async function sendDeleteSavedTabMessageToTab(): Promise<void> {
    // スナックバー表示用にメッセージを送信
    const currentTab = await getCurrentTab()
    if (currentTab.id === undefined) return
    sendMessageToTab(currentTab.id, { actionType: ActionType.deleteTab })
}
