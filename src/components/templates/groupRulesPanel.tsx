import React from 'react'
import TabPanel from '../atom/tabPanel'
import GroupRulesList from '../organisms/groupRulesList'
import type { GroupRule } from '../../common/interface/groupRule'

interface Props {
  // 現在のタブ番号
  tab: number
  // 自身のタブ番号
  index: number
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

export default function GroupRulesPanel(props: Props): JSX.Element {
  return (
    <TabPanel value={props.tab} index={props.index}>
      <GroupRulesList
        groupMode={props.groupMode}
        setGroupMode={props.setGroupMode}
        ignoreRule={props.ignoreRule}
        setIgnoreRule={props.setIgnoreRule}
        groupRule={props.groupRule}
        setGroupRule={props.setGroupRule}
      />
    </TabPanel>
  )
}