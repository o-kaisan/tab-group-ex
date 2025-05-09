export interface SavedTabGroupInfo {
    // アプリが内部で持つタブグループID
    id: string
    // chromeが設定したタブグループID
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
