import React from 'react'
import DisplaySavedTabGroupItem from './displaySavedTabGroupItem'
import EditSavedTabGroupItem from './editSavedTabGroupItem'

interface Props {
  // タブグループID
  id: number
  // タブグループのタイトル
  title: string
  // タブグループのURLリスト
  urlList: string[]
  // 保存されたタブグループを取得するメソッド
  getSavedTabGroupList: Function
  // タブグループを更新するメソッド
  updatedTabGroupList: Function
}

export default function SavedTabGroupItem(props: Props): JSX.Element {
  const [editMode, setEditMode] = React.useState(false)

  return (
    <div>
      {editMode ? (
        <EditSavedTabGroupItem
          id={props.id}
          title={props.title}
          setEditMode={setEditMode}
          getSavedTabGroupList={props.getSavedTabGroupList}
        />
      ) : (
        <DisplaySavedTabGroupItem
          id={props.id}
          title={props.title}
          urlList={props.urlList}
          setEditMode={setEditMode}
          getSavedTabGroupList={props.getSavedTabGroupList}
          updatedTabGroupList={props.updatedTabGroupList}
        />
      )}
    </div>
  )
}
