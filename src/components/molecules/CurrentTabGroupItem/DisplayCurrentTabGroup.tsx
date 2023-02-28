import React from 'react'
import ListItemText from '@mui/material/ListItemText'
import SaveAltIcon from '@mui/icons-material/SaveAlt'
import { IconButton, ListItem, ListItemButton } from '@mui/material'
import {
  saveTabGroup,
  toggleTabGroupCollapsed
} from '../../../common/utils/tabGroups'
import CurrentTabGroupOption from './CurrentTabGroupOption'

interface Props {
  // タブグループID
  id: number
  // タブグループの開閉
  collapsed: boolean
  // タブグループのタイトル
  title: string
  // 編集モード
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>
  // getSavedTabGroupListメソッド
  getSavedTabGroupList: Function
  // updateCurrentTabGroupListメソッド
  updateCurrentTabGroupList: Function
}

export default function DisplayCurrentTabGroup(props: Props): JSX.Element {
  // タブグループメニュを管理
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleTabGroupItemClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    isRight: boolean,
    tabGroupId: number,
    collapsed: boolean
  ): void => {
    e.preventDefault()
    if (isRight) {
      setAnchorEl(e.currentTarget)
    } else {
      runUpdateTabGroupCollapsed(tabGroupId, collapsed)
    }
  }

  const runUpdateTabGroupCollapsed = (
    tabGroupId: number,
    collapsed: boolean
  ): void => {
    void toggleTabGroupCollapsed(tabGroupId, !collapsed)
    props.updateCurrentTabGroupList()
  }

  const runSaveTabGroup = (tabGroupId: number, tabGroupTitle: string): void => {
    void saveTabGroup(tabGroupId, tabGroupTitle).then(() =>
      props.getSavedTabGroupList()
    )
  }

  return (
    <ListItem>
      <ListItemButton
        sx={{ pl: 4 }}
        onClick={(e) => {
          handleTabGroupItemClick(e, false, props.id, props.collapsed)
        }}
        onContextMenu={(e) => {
          handleTabGroupItemClick(e, true, props.id, props.collapsed)
        }}
      >
        <ListItemText>{props.title}</ListItemText>
      </ListItemButton>
      <IconButton
        onClick={() => {
          runSaveTabGroup(props.id, props.title)
        }}
      >
        <SaveAltIcon />
      </IconButton>
      <CurrentTabGroupOption
        tabGroupId={props.id}
        updateCurrentTabGroupList={props.updateCurrentTabGroupList}
        setEditMode={props.setEditMode}
        open={open}
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
      />
    </ListItem>
  )
}
