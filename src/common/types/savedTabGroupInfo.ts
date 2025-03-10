export interface SavedTabGroupInfo {
    id: string
    // 保存時のグループID
    tabGroupId: number
    // タブグループのタイトル
    title: string
    // タブグループに保存されているタブ
    urls: Url[]
    // カラー
    color: string
}

export interface Url {
    title: string | undefined
    url: string
    favIconUrl: string | undefined
}
