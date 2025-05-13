// manifest.jsonのショートカットと文字列を対応させているので変更には注意
export const ActionType = {
    // 表示中のタブグループ/タブに関連するアクション
    save: 'SaveCurrentTabGroup',
    groupAll: 'GroupAllUnGroupedTabs',
    groupByDomain: 'GroupTabsByDomain',
    groupByCustomDomain: 'GroupTabsByCustomDomain',
    ungroupAll: 'UngroupAllGroups',
    ungroup: 'Ungroup',
    closeGroup: 'CloseGroup',
    closeTab: 'CloseTab',
    closeSavedGroup: 'CloseSavedGroup',
    closeSavedTab: 'CloseSavedTab',
    // 保存済みのタブグループ/タブに関連するアクション
    restoreGroup: 'RestoreGroup',
    restoreTab: 'RestoreTab',
    deleteGroup: 'DeleteTab',
    deleteTab: 'DeleteTab'
}
