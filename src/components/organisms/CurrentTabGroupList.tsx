import React from 'react'
import List from '@mui/material/List'
import { ListSubheader } from '@mui/material'
import CurrentTabGroupItem from '../../components/molecules/CurrentTabGroupItem/CurrentTabGroupItem'

interface Props {
  // タブグループの一覧のステート
  currentTabGroups: chrome.tabGroups.TabGroup[]
  // タブグループを保存するメソッド
  getSavedTabGroupList: Function
  // タブグループを更新するメソッド
  updateCurrentTabGroupList: Function
}

// TODO なにもないときにないことがわかるようにしたい
export default function CurrentTabGroupList(props: Props): JSX.Element {
  return (
    <List>
      <ListSubheader>Active TabGroups</ListSubheader>
      {props.currentTabGroups.map((tabGroup) => (
        <CurrentTabGroupItem
          key={tabGroup.id}
          id={tabGroup.id}
          collapsed={tabGroup.collapsed}
          title={tabGroup.title}
          getSavedTabGroupList={props.getSavedTabGroupList}
          updateCurrentTabGroupList={props.updateCurrentTabGroupList}
        />
      ))}
    </List>
  )
}
