import React from 'react'
import List from '@mui/material/List'
import ListSubheader from '@mui/material/ListSubheader'
import SelectTabGroupMode from '../molecules/SettingItems/SelectTabGroupMode'
import type { GroupRule } from '../../common/types/groupRule'

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
    <List>
      <ListSubheader>Settings</ListSubheader>
      <SelectTabGroupMode
        groupMode={props.groupMode}
        setGroupMode={props.setGroupMode}
      />
    </List>
  )
}
