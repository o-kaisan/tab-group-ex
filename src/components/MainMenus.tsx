import React, { useEffect, useState } from 'react'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import Typography from '@mui/material/Typography'
import LayersIcon from '@mui/icons-material/Layers'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import WebStoriesIcon from '@mui/icons-material/WebStories'
import {
  getAllTabGroupList,
  groupActiveTabs,
  type SavedTabGroupInfo,
  getAllSavedTabGroup
} from '../utils/tabGroups'
import {
  Collapse,
  ListItem,
  ListItemButton,
  ListSubheader
} from '@mui/material'
import FolderIcon from '@mui/icons-material/Folder'
import ActiveTabGroupList from '../components/ActiveTabGroupList'
import { type GroupRule } from './TabPanel'

/*
 * 拡張機能のメニュー
 */
interface Props {
  groupMode: string
  ignoreRule: boolean
  groupRule: GroupRule[]
  setSavedTabGroup: React.Dispatch<React.SetStateAction<SavedTabGroupInfo[]>>
  updatedTabGroupList: Function
  getSavedTabGroupList: Function
  activeTabGroup: chrome.tabGroups.TabGroup[]
}

export default function MainMenu (props: Props) {
  const runGroupActiveTabs = () => {
    /*
     * タブをグループ化
     */
    groupActiveTabs(
      props.groupMode,
      props.groupRule,
      props.ignoreRule
    )
      .then(() => {
        props.updatedTabGroupList()
      })
      .catch((error) => { console.log(error) })
  }

  return (
    <List
      sx={{ width: '100%', minWidth: 340, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <ListItem>
        <ListItemButton onClick={runGroupActiveTabs}>
          <ListItemIcon>
            <LayersIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>タブをグループ化</ListItemText>
        </ListItemButton>
      </ListItem>
      <Divider />
      <ActiveTabGroupList
        activeTabGroup={props.activeTabGroup}
        getSavedTabGroupList={props.getSavedTabGroupList}
        updatedTabGroupList={props.updatedTabGroupList}
      />
    </List>
  )
}
