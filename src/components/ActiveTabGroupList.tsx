import React from 'react'
import { ListSubheader } from '@mui/material'
import ActiveTabGroupItem from './ActiveTabGroupItem'
interface Props {
  // タブグループの一覧のステート
  activeTabGroup: chrome.tabGroups.TabGroup[]
  // タブグループを保存するメソッド
  // eslint-disable-next-line @typescript-eslint/ban-types
  getSavedTabGroupList: Function
  // タブグループを更新するメソッド
  // eslint-disable-next-line @typescript-eslint/ban-types
  updatedTabGroupList: Function
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function ActiveTabGroupList(props: Props) {
  return (
    <div>
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
    </div>
  )
}
