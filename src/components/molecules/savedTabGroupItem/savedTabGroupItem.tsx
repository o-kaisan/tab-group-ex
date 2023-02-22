import React from 'react'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import {
  restoreTabGroup,
  deleteTabGroup
} from '../../../common/utils/tabGroups'
import {
  IconButton,
  ListItem,
  ListItemButton,
  ListItemText
} from '@mui/material'

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
  const runDeleteTabGroup = (
    tabGroupTitle: string,
    tabGroupId: number
  ): void => {
    void deleteTabGroup(tabGroupTitle, tabGroupId).then(() =>
      props.getSavedTabGroupList()
    )
  }

  const runRestoreTabGroup = (
    tabGroupTitle: string,
    urlList: string[]
  ): void => {
    void restoreTabGroup(tabGroupTitle, urlList).then(() => {
      props.updatedTabGroupList() // 処理が走っていない
    })
  }

  return (
    <ListItem>
      <ListItemButton
        sx={{ pl: 4 }}
        onClick={() => {
          runRestoreTabGroup(props.title, props.urlList)
        }}
      >
        <ListItemText>{props.title}</ListItemText>
      </ListItemButton>
      <IconButton
        onClick={() => {
          runDeleteTabGroup(props.title, props.id)
        }}
      >
        <DeleteForeverIcon />
      </IconButton>
    </ListItem>
  )
}
