import { groupTabs, ungroupAllTabs, getTabGroupByTabGroupId } from '../common/libs/tabGroup'
import { saveTabGroup } from '../common/libs/savedTabGroup'
import { getCurrentTabs, sendGroupMessageToTab, sendUngroupMessageToTab } from '../common/libs/tab'
import { sendMessageToTab } from '../common/libs/message'
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
    const tab = await getCurrentTabs()
    if (tab === undefined) return
    if (tab.id === undefined) return

    const tabGroup = await getTabGroupByTabGroupId(tab.groupId)
    if (tabGroup === undefined) return

    let tabGroupTitle = String(tabGroup.id)
    if (tabGroup.title !== undefined) {
        tabGroupTitle = tabGroup.title
    }
    await saveTabGroup(tabGroupTitle, tabGroup.id, tabGroup.color)
    // content_scriptにメッセージを送信
    sendMessageToTab(tab.id, { actionType: ActionType.save })
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
