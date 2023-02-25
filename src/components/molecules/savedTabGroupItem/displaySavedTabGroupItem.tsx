import React from 'react'
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
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import SavedTabGroupOption from './savedTabGroupOption'

interface Props {
  // タブグループID
  id: number
  // タブグループのタイトル
  title: string
  // タブグループのURLリスト
  urlList: string[]
  // 編集モード
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>
  // 保存されたタブグループを取得するメソッド
  getSavedTabGroupList: Function
  // タブグループを更新するメソッド
  updatedTabGroupList: Function
}

export default function DisplaySavedTabGroupItem(props: Props): JSX.Element {
  // タブグループメニュを管理
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleTabGroupItemClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    isRight: boolean,
    title: string,
    urlList: string[]
  ): void => {
    e.preventDefault()
    if (isRight) {
      setAnchorEl(e.currentTarget)
    } else {
      runRestoreTabGroup(title, urlList)
    }
  }

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
      props.updatedTabGroupList()
    })
  }

  return (
    <ListItem>
      <ListItemButton
        sx={{ pl: 4 }}
        onClick={(e) => {
          handleTabGroupItemClick(e, false, props.title, props.urlList)
        }}
        onContextMenu={(e) => {
          handleTabGroupItemClick(e, true, props.title, props.urlList)
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
      <SavedTabGroupOption
        tabGroupId={props.id}
        setEditMode={props.setEditMode}
        open={open}
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
      />
    </ListItem>
  )
}
