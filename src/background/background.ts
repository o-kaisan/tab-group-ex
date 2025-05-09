
import { groupTabs, ungroupAllTabs, getTabGroupByTabGroupId } from "../common/libs/tabGroup";
import { saveTabGroup } from "../common/libs/savedTabGroup";
import { getCurrentTabs } from "../common/libs/tab";
import { GROUP_MODE } from "../common/types/groupMode"
import { CommandType as commandType } from "../common/types/command";

chrome.commands.onCommand.addListener((command) => {
    console.log("Command: %s", command)
    switch (command) {
        case commandType.saveCurrentTabGroup:
            saveCurrentTabGroup().catch((e) => { console.log(e) })
            break;
        case commandType.groupAllUnGroupedTabs:
            groupAllUngroupedTabs().catch((e) => { console.log(e) })
            break;
        case commandType.groupTabsByDomain:
            groupByDomain().catch((e) => { console.log(e) });
            break;
        case commandType.groupTabsByCustomDomain:
            groupByCustomDomain().catch((e) => { console.log(e) });
            break;
        case commandType.ungroupAllGroups:
            ungroupAllGroups().catch((e) => { console.log(e) });
            break;
    }
})

const saveCurrentTabGroup = async (): Promise<void> => {
    console.log("save start.")
    const tab = await getCurrentTabs()
    console.log(tab)
    const tabGroup = await getTabGroupByTabGroupId(tab.groupId)
    console.log(tabGroup)
    if (tabGroup === undefined){
        return
    }
    let tabGroupTitle = String(tabGroup.id)
    if (tabGroup.title !== undefined){
        tabGroupTitle = tabGroup.title
    }
    await saveTabGroup(tabGroupTitle, tabGroup.id, tabGroup.color)
    console.log("save complited.")
}

const groupAllUngroupedTabs = async (): Promise<void> => {
    await groupTabs(GROUP_MODE.all)
}
const groupByDomain = async (): Promise<void> => {
    await groupTabs(GROUP_MODE.domain)
}
const groupByCustomDomain = async (): Promise<void> => {
    await groupTabs(GROUP_MODE.customDomain)
}

const ungroupAllGroups = async (): Promise<void> => {
    await ungroupAllTabs()
}