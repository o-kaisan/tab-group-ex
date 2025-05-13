export const GroupModeType = {
    all: 'All',
    domain: 'Domain',
    customDomain: 'Custom Domain'
}

// 型定義
export type GroupMode = typeof GroupModeType[keyof typeof GroupModeType];