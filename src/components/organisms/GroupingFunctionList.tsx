import React from 'react'
import List from '@mui/material/List'
import { ListSubheader } from '@mui/material'
import GroupCurrentTabs from '../molecules/GroupingFunctionItem/GroupCurrentTabs'
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
  updateCurrentTabGroupList: Function
  // タブグループの取得処理
  getSavedTabGroupList: Function
}

export default function GroupingFunctionList(props: Props): JSX.Element {
  return (
    <List>
      <ListSubheader>Grouping</ListSubheader>
      <GroupCurrentTabs
        groupMode={props.groupMode}
        ignoreRule={props.ignoreRule}
        groupRule={props.groupRule}
        setSavedTabGroup={props.setSavedTabGroup}
        updateCurrentTabGroupList={props.updateCurrentTabGroupList}
        getSavedTabGroupList={props.getSavedTabGroupList}
      />
    </List>
  )
}
