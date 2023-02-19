import React from 'react'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import LayersIcon from '@mui/icons-material/Layers'
import { groupActiveTabs } from '../utils/tabGroups'
import type { SavedTabGroupInfo } from '../utils/tabGroups'
import { ListItem, ListItemButton } from '@mui/material'
import ActiveTabGroupList from '../components/ActiveTabGroupList'
import type { GroupRule } from './TabPanel'

/*
 * 拡張機能のメニュー
 */
interface Props {
  groupMode: string
  ignoreRule: boolean
  groupRule: GroupRule[]
  setSavedTabGroup: React.Dispatch<React.SetStateAction<SavedTabGroupInfo[]>>
  // eslint-disable-next-line @typescript-eslint/ban-types
  updatedTabGroupList: Function
  // eslint-disable-next-line @typescript-eslint/ban-types
  getSavedTabGroupList: Function
  activeTabGroup: chrome.tabGroups.TabGroup[]
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function MainMenu(props: Props) {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const runGroupActiveTabs = () => {
    /*
     * タブをグループ化
     */
    groupActiveTabs(props.groupMode, props.groupRule, props.ignoreRule)
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
