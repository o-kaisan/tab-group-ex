export interface SavedTabGroupInfo {
    // ストレージ保存用のタイプ
    type: string
    // 保存時のグループID
    tabGroupId: number
    // タブグループのタイトル
    title: string
    // タブグループに保存されているタブ
    urlList: string[]
}
