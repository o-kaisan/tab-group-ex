import {
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader
} from '@mui/material'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import {
  type SavedTabGroupInfo,
  restoreTabGroup,
  deleteTabGroup
} from '../utils/tabGroups'
import React from 'react'

interface Props {
  // タブグループID
  savedTabGroup: SavedTabGroupInfo[]
  // 保存されたタブグループを取得するメソッド
  getSavedTabGroupList: Function
  // タブグループを更新するメソッド
  updatedTabGroupList: Function
}

export default function SavedTabGroupList (props: Props) {
  const runDeleteTabGroup = (tabGroupTitle: string, tabGroupId: number) => {
    deleteTabGroup(tabGroupTitle, tabGroupId).then(() =>
      props.getSavedTabGroupList()
    )
  }

  const runRestoreTabGroup = (tabGroupTitle: string, urlList: string[]) => {
    restoreTabGroup(tabGroupTitle, urlList)
      .then(() => {
        props.updatedTabGroupList()
      })
      .catch((error) => { console.log(error) })
  }
  return (
    <List
      sx={{ width: '100%', minWidth: 340, bgcolor: 'background.paper' }}
      component="div"
      disablePadding
    >
      <ListSubheader>Saved TabGroups</ListSubheader>
      {props.savedTabGroup.map((tabGroup) => (
        <ListItem>
          <ListItemButton
            sx={{ pl: 4 }}
            onClick={() => {
              runRestoreTabGroup(tabGroup.title, tabGroup.urlList)
            }}
          >
            <ListItemText>{tabGroup.title}</ListItemText>
          </ListItemButton>
          <IconButton
            onClick={() => { runDeleteTabGroup(tabGroup.title, tabGroup.id) }}
          >
            <DeleteForeverIcon />
          </IconButton>
        </ListItem>
      ))}
    </List>
  )
}
