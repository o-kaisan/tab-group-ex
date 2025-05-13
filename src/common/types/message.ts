export const MessageType = {
    save: 'save',
    groupAll: 'groupAll',
    groupByDomain: 'groupByDomain',
    groupByCustomDomain: 'groupByCustomDomain',
    ungroupAll: 'ungroupAll',
    ungroup: 'ungroup',
    close: 'close',
    restore: 'restore'
}

// 型定義
export interface Message {
    messageType: typeof MessageType[keyof typeof MessageType];
}
