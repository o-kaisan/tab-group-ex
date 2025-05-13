import { groupTabs, ungroupAllTabs } from '../common/libs/tabGroup'
import { saveCurrentTabGroupToStorage } from '../common/libs/savedTabGroup'
import { sendMessageToTab, sendGroupMessageToTab, sendUngroupMessageToTab } from '../common/libs/message'
import { ActionType } from '../common/const/action'
import { CommandType } from '../common/const/command'

// キーボードショートカットを処理する
chrome.commands.onCommand.addListener((command) => {
    console.log('Command: %s', command)
    switch (command) {
        case CommandType.saveCurrentTabGroup:
            saveCurrentTabGroup().catch((e) => {
                console.log(e)
            })
            break
        case CommandType.groupAllUnGroupedTabs:
            groupUngroupedTabs().catch((e) => {
                console.log(e)
            })
            break
        case CommandType.groupTabsByDomain:
            groupByDomain().catch((e) => {
                console.log(e)
            })
            break
        case CommandType.groupTabsByCustomDomain:
            groupByCustomDomain().catch((e) => {
                console.log(e)
            })
            break
        case CommandType.ungroupAllGroups:
            ungroupAllGroups().catch((e) => {
                console.log(e)
            })
            break
    }
})

const saveCurrentTabGroup = async (): Promise<void> => {
    saveCurrentTabGroupToStorage((tabId) => {
        // content_scriptにメッセージを送信
        sendMessageToTab(tabId, { actionType: ActionType.save })
    })
}

const groupUngroupedTabs = async (): Promise<void> => {
    await groupTabs(ActionType.groupAll)
    // content_scriptにメッセージを送信
    await sendGroupMessageToTab(ActionType.groupAll)
}
const groupByDomain = async (): Promise<void> => {
    await groupTabs(ActionType.groupByDomain)
    // content_scriptにメッセージを送信
    await sendGroupMessageToTab(ActionType.groupByDomain)
}
const groupByCustomDomain = async (): Promise<void> => {
    await groupTabs(ActionType.groupByCustomDomain)
    // content_scriptにメッセージを送信
    await sendGroupMessageToTab(ActionType.groupByCustomDomain)
}

const ungroupAllGroups = async (): Promise<void> => {
    await ungroupAllTabs()
    // content_scriptにメッセージを送信
    await sendUngroupMessageToTab()
}
