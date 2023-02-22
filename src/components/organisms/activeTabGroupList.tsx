import React from 'react'
import List from '@mui/material/List'
import { ListSubheader } from '@mui/material'
import ActiveTabGroupItem from '../../components/molecules/activeTabGroupItem/activeTabGroupItem'

interface Props {
  // タブグループの一覧のステート
  activeTabGroup: chrome.tabGroups.TabGroup[]
  // タブグループを保存するメソッド
  getSavedTabGroupList: Function
  // タブグループを更新するメソッド
  updatedTabGroupList: Function
}

export default function ActiveTabGroupList(props: Props): JSX.Element {
  return (
    <List>
      <ListSubheader>Active TabGroups</ListSubheader>
      {props.activeTabGroup.map((tabGroup) => (
        <ActiveTabGroupItem
          key={tabGroup.id}
          id={tabGroup.id}
          collapsed={tabGroup.collapsed}
          title={tabGroup.title}
          getSavedTabGroupList={props.getSavedTabGroupList}
          updatedTabGroupList={props.updatedTabGroupList}
        />
      ))}
    </List>
  )
}
