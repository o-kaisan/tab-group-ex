export const CommandType = {
    SAVE_GROUP: "SaveCurrentTabGroup",
    GROUP_ALL_UNGROUPED_TABS: "GroupAllUnGroupedTabs",
    GROUP_TABS_BY_DOMAIN: "GroupTabsByDomain",
    GROUP_TABS_BY_CUSTOM_DOMAIN: "GroupTabsByCustomDomain",
    UNGROUP_ALL_GROUPS: "UngroupAllGroups"
}

export type Command = (typeof CommandType)[keyof typeof CommandType];