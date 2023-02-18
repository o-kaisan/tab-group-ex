import React from 'react'
import List from '@mui/material/List'
import ListItemText from '@mui/material/ListItemText'
import { ListItem, ListItemButton, ListSubheader } from '@mui/material'
import ActiveTabGroupItem from './ActiveTabGroupItem'
interface Props {
  // タブグループの一覧のステート
  activeTabGroup: chrome.tabGroups.TabGroup[]
  // タブグループを保存するメソッド
  getSavedTabGroupList: Function
  // タブグループを更新するメソッド
  updatedTabGroupList: Function
}

export default function ActiveTabGroupList (props: Props) {
  return (
    <div>
      <ListSubheader>Active TabGroups</ListSubheader>
      {props.activeTabGroup.map((tabGroup) => (
        <ActiveTabGroupItem
          id={tabGroup.id}
          collapsed={tabGroup.collapsed}
          title={tabGroup.title}
          getSavedTabGroupList={props.getSavedTabGroupList}
          updatedTabGroupList={props.updatedTabGroupList}
        />
      ))}
    </div>
  )
}
