import React from 'react'
import SavedTabGroupList from '../../components/organisms/SavedTabGroupList'
import type { SavedTabGroupInfo } from '../../common/types/savedTabGroupInfo'
import TabPanel from '../atom/TabPanel'

interface Props {
  // 現在のタブ番号
  tab: number
  // 自身のタブ番号
  index: number
  // タブグループID
  savedTabGroup: SavedTabGroupInfo[]
  // 保存されたタブグループを取得するメソッド
  getSavedTabGroupList: Function
  // タブグループを更新するメソッド
  updatedTabGroupList: Function
}

export default function SavedTabGroupPanel(props: Props): JSX.Element {
  return (
    <TabPanel value={props.tab} index={props.index}>
      <SavedTabGroupList
        savedTabGroup={props.savedTabGroup}
        getSavedTabGroupList={props.getSavedTabGroupList}
        updatedTabGroupList={props.updatedTabGroupList}
      />
    </TabPanel>
  )
}
