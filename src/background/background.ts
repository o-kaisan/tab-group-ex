import { groupTabs, ungroupAllTabs } from '../common/libs/tabGroup'
import { saveCurrentTabGroupToStorage } from '../common/libs/savedTabGroup'
import { sendMessageToTab, sendGroupMessageToTab, sendUngroupMessageToTab } from '../common/libs/message'
import { ActionType } from '../common/const/action'
import { type Command, CommandType } from '../common/const/command'

// キーボードショートカットを処理する
chrome.commands.onCommand.addListener((command: Command) => {
    console.log('Command: %s', command)
    switch (command) {
        case CommandType.SAVE_GROUP:
            saveCurrentTabGroup().catch((e) => {
                console.log(e)
            })
            break
        case CommandType.GROUP_ALL_UNGROUPED_TABS:
            groupUngroupedTabs().catch((e) => {
                console.log(e)
            })
            break
        case CommandType.GROUP_TABS_BY_DOMAIN:
            groupByDomain().catch((e) => {
                console.log(e)
            })
            break
        case CommandType.GROUP_TABS_BY_CUSTOM_DOMAIN:
            groupByCustomDomain().catch((e) => {
                console.log(e)
            })
            break
        case CommandType.UNGROUP_ALL_GROUPS:
            ungroupAllGroups().catch((e) => {
                console.log(e)
            })
            break
    }
})

const saveCurrentTabGroup = async (): Promise<void> => {
    void saveCurrentTabGroupToStorage((tabId) => {
        // content_scriptにメッセージを送信
        sendMessageToTab(tabId, { actionType: ActionType.SAVE_GROUP })
    })
}

const groupUngroupedTabs = async (): Promise<void> => {
    await groupTabs(ActionType.GROUP_ALL)
    // content_scriptにメッセージを送信
    await sendGroupMessageToTab(ActionType.GROUP_ALL)
}
const groupByDomain = async (): Promise<void> => {
    await groupTabs(ActionType.GROUP_BY_DOMAIN)
    // content_scriptにメッセージを送信
    await sendGroupMessageToTab(ActionType.GROUP_BY_DOMAIN)
}
const groupByCustomDomain = async (): Promise<void> => {
    await groupTabs(ActionType.GROUP_BY_CUSTOM_DOMAIN)
    // content_scriptにメッセージを送信
    await sendGroupMessageToTab(ActionType.GROUP_BY_CUSTOM_DOMAIN)
}

const ungroupAllGroups = async (): Promise<void> => {
    await ungroupAllTabs()
    // content_scriptにメッセージを送信
    await sendUngroupMessageToTab()
}
