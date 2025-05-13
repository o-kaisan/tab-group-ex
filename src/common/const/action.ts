export const ActionType = {
    // manifest.jsonのショートカットと文字列を対応させているので変更には注意
    // ショートカットあり
    save: 'SaveCurrentTabGroup',
    groupAll: 'GroupAllUnGroupedTabs',
    groupByDomain: 'GroupTabsByDomain',
    groupByCustomDomain: 'GroupTabsByCustomDomain',
    ungroupAll: 'UngroupAllGroups',
    // ショートカット無し
    ungroup: 'Ungroup',
    closeGroup: 'CloseGroup',
    closeTab: 'CloseTab',
    closeSavedGroup: 'CloseSavedGroup',
    closeSavedTab: 'CloseSavedTab',
    restoreGroup: 'RestoreGroup',
    restoreTab: 'RestoreTab'
}
