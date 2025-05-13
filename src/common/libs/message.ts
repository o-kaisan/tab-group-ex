import { type Message } from '../types/message'

/*
 * 下記のパターンでメッセージを送信する
 *   - context_script -> popup
 *   - context_script -> background
 *   - popup -> background
 *   - background -> popup
 */
export function sendMessage(msg: Message): void {
    chrome.runtime.sendMessage(msg)
}

/*
 * 下記のパターンでメッセージを送信する
 *   - popup -> context_script
 *   - background -> context_script
 */
export function sendMessageToTab(tabId: number, msg: Message): void {
    chrome.tabs.sendMessage(tabId, msg)
}

