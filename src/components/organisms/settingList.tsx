import React from 'react'
import List from '@mui/material/List'
import ListSubheader from '@mui/material/ListSubheader'
import SelectTabGroupMode from '../molecules/settingItems/selectTabGroupMode'
import NonRuleGrouping from '../molecules/settingItems/nonRuleGrouping'
import { GROUP_MODE } from '../../common/const/groupMode'
import type { GroupRule } from '../../common/interface/groupRule'

interface Props {
  // グループ化設定
  groupMode: string
  // グループ化設定の更新処理
  setGroupMode: React.Dispatch<React.SetStateAction<string>>
  // 対象のドメイン以外のタブをグループ化するかの設定
  ignoreRule: boolean
  // グループ化対象のドメインの更新処理
  setIgnoreRule: React.Dispatch<React.SetStateAction<boolean>>
  // グループ化対象のドメイン
  groupRule: GroupRule[]
  // グループ化対象のドメインの更新処理
  setGroupRule: React.Dispatch<React.SetStateAction<GroupRule[]>>
}

export default function SettingList(props: Props): JSX.Element {
  return (
    <List sx={{ width: '100%', minWidth: 340, bgcolor: 'background.paper' }}>
      <ListSubheader>Settings</ListSubheader>
      <SelectTabGroupMode
        groupMode={props.groupMode}
        setGroupMode={props.setGroupMode}
      />
      {props.groupMode === GROUP_MODE.CUSTOM && (
        <NonRuleGrouping
          ignoreRule={props.ignoreRule}
          setIgnoreRule={props.setIgnoreRule}
        />
      )}
    </List>
  )
}
