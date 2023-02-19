import {
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader
} from '@mui/material'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { restoreTabGroup, deleteTabGroup } from '../utils/tabGroups'
import type { SavedTabGroupInfo } from '../utils/tabGroups'
import React from 'react'

interface Props {
  // タブグループID
  savedTabGroup: SavedTabGroupInfo[]
  // 保存されたタブグループを取得するメソッド
  // eslint-disable-next-line @typescript-eslint/ban-types
  getSavedTabGroupList: Function
  // タブグループを更新するメソッド
  // eslint-disable-next-line @typescript-eslint/ban-types
  updatedTabGroupList: Function
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function SavedTabGroupList(props: Props) {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const runDeleteTabGroup = (tabGroupTitle: string, tabGroupId: number) => {
    void deleteTabGroup(tabGroupTitle, tabGroupId).then(() =>
      props.getSavedTabGroupList()
    )
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const runRestoreTabGroup = (tabGroupTitle: string, urlList: string[]) => {
    restoreTabGroup(tabGroupTitle, urlList)
      .then(() => {
        props.updatedTabGroupList()
      })
      .catch((error) => {
        console.log(error)
      })
  }
  return (
    <List
      sx={{ width: '100%', minWidth: 340, bgcolor: 'background.paper' }}
      component="div"
      disablePadding
    >
      <ListSubheader>Saved TabGroups</ListSubheader>
      {props.savedTabGroup.map((tabGroup) => (
        // eslint-disable-next-line react/jsx-key
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
            onClick={() => {
              runDeleteTabGroup(tabGroup.title, tabGroup.id)
            }}
          >
            <DeleteForeverIcon />
          </IconButton>
        </ListItem>
      ))}
    </List>
  )
}
