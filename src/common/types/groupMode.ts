export const GroupMode = {
    all: 'All',
    domain: 'Domain',
    customDomain: 'Custom Domain'
}

// 型定義
export type GroupModeType = typeof GroupMode[keyof typeof GroupMode];