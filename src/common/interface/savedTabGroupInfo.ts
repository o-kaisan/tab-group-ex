export interface SavedTabGroupInfo {
  // ストレージ保存用のタイプ
  type: string
  // 保存時のグループID
  id: number
  // タブグループのタイトル
  title: string
  // タブグループに保存されているタブ
  urlList: string[]
}
