import React from 'react'
import List from '@mui/material/List'
import { ListSubheader } from '@mui/material'
import GroupActiveTabs from '../molecules/GroupingFunctionItem/GroupActiveTabs'
import type { GroupRule } from '../../common/types/groupRule'
import type { SavedTabGroupInfo } from '../../common/types/savedTabGroupInfo'

interface Props {
  // グループ化設定
  groupMode: string
  // 対象のドメイン以外のタブをグループ化するかの設定
  ignoreRule: boolean
  // グループ化対象のドメイン
  groupRule: GroupRule[]
  // タブグループの保存処理
  setSavedTabGroup: React.Dispatch<React.SetStateAction<SavedTabGroupInfo[]>>
  // タブグループの更新処理
  updatedTabGroupList: Function
  // タブグループの取得処理
  getSavedTabGroupList: Function
  // タブグループの一覧
  activeTabGroup: chrome.tabGroups.TabGroup[]
}

export default function GroupingFunctionList(props: Props): JSX.Element {
  return (
    <List>
      <ListSubheader>Grouping</ListSubheader>
      <GroupActiveTabs
        groupMode={props.groupMode}
        ignoreRule={props.ignoreRule}
        groupRule={props.groupRule}
        setSavedTabGroup={props.setSavedTabGroup}
        updatedTabGroupList={props.updatedTabGroupList}
        getSavedTabGroupList={props.getSavedTabGroupList}
        activeTabGroup={props.activeTabGroup}
      />
    </List>
  )
}
