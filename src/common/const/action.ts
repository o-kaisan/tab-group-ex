// manifest.jsonのショートカットと文字列を対応させているので変更には注意
export const ActionType = {
    // 表示中のタブグループ/タブに関連するアクション
    SAVE_GROUP: 'SaveCurrentTabGroup',
    GROUP_ALL: 'GroupAllUnGroupedTabs',
    GROUP_BY_DOMAIN: 'GroupTabsByDomain',
    GROUP_BY_CUSTOM_DOMAIN: 'GroupTabsByCustomDomain',
    UNGROUP_ALL_GROUP: 'UngroupAllGroups',
    UNGROUP_ONE_GROUP: 'Ungroup',
    CLOSE_GROUP: 'CloseGroup',
    CLOSE_TAB: 'CloseTab',
    // 保存済みのタブグループ/タブに関連するアクション
    RESTORE_GROUP: 'RestoreGroup',
    RESTORE_TAB: 'RestoreTab',
    DELETE_GROUP: 'DeleteTab',
    DELETE_TAB: 'DeleteTab'
}


export type Action = (typeof ActionType)[keyof typeof ActionType];