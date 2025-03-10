
import { groupTabs, ungroupAllTabs } from "../common/libs/tabGroup";
import { GROUP_MODE } from "../common/types/groupMode"

chrome.commands.onCommand.addListener((command) => {
    console.log("Command: %s", command)
    switch (command) {
        case "GroupAllUnGroupedTabs":
            console.log("grouped by all")
            groupAllUngroupedTabs().catch((e) => { console.log(e) })
            break;
        case "GroupTabsByDomain":
            console.log("grouped by domain")
            groupByDomain().catch((e) => { console.log(e) });
            break;
        case "GroupTabsByCustomDomain":
            console.log("grouped by custom domain")
            groupByCustomDomain().catch((e) => { console.log(e) });
            break;
        case "UngroupAllGroups":
            console.log("upgroup all groups")
            ungroupAllGroups().catch((e) => { console.log(e) });
            break;
    }
})

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