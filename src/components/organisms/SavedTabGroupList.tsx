import React from 'react'
import { List, ListSubheader } from '@mui/material'
import type { SavedTabGroupInfo } from '../../common/types/savedTabGroupInfo'
import SavedTabGroupItem from '../../components/molecules/SavedTabGroupItem/SavedTabGroupItem'

interface Props {
  // タブグループID
  savedTabGroup: SavedTabGroupInfo[]
  // 保存されたタブグループを取得するメソッド
  getSavedTabGroupList: Function
  // タブグループを更新するメソッド
  updatedTabGroupList: Function
}

export default function SavedTabGroupList(props: Props): JSX.Element {
  return (
    <List>
      <ListSubheader>Saved TabGroups</ListSubheader>
      {props.savedTabGroup.map((tabGroup) => (
        <SavedTabGroupItem
          key={tabGroup.id}
          id={tabGroup.id}
          title={tabGroup.title}
          urlList={tabGroup.urlList}
          getSavedTabGroupList={props.getSavedTabGroupList}
          updatedTabGroupList={props.updatedTabGroupList}
        />
      ))}
    </List>
  )
}
