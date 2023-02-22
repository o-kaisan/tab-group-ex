import React from 'react'
import SavedTabGroupList from '../../components/organisms/savedTabGroupList'
import type { SavedTabGroupInfo } from '../../common/interface/savedTabGroupInfo'

interface Props {
  // タブグループID
  savedTabGroup: SavedTabGroupInfo[]
  // 保存されたタブグループを取得するメソッド
  getSavedTabGroupList: Function
  // タブグループを更新するメソッド
  updatedTabGroupList: Function
}

export default function SavedTabGroupMenu(props: Props): JSX.Element {
  return (
    <SavedTabGroupList
      savedTabGroup={props.savedTabGroup}
      getSavedTabGroupList={props.getSavedTabGroupList}
      updatedTabGroupList={props.updatedTabGroupList}
    />
  )
}
