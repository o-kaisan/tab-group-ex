import React from 'react'
import GroupingRuleList from '../organisms/groupingRuleList'
import SettingList from '../organisms/settingList'
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

export default function Settings(props: Props): JSX.Element {
  return (
    <div>
      <SettingList
        groupMode={props.groupMode}
        setGroupMode={props.setGroupMode}
        ignoreRule={props.ignoreRule}
        setIgnoreRule={props.setIgnoreRule}
        groupRule={props.groupRule}
        setGroupRule={props.setGroupRule}
      />
      {props.groupMode === GROUP_MODE.CUSTOM && (
        <GroupingRuleList
          groupMode={props.groupMode}
          setGroupMode={props.setGroupMode}
          ignoreRule={props.ignoreRule}
          setIgnoreRule={props.setIgnoreRule}
          groupRule={props.groupRule}
          setGroupRule={props.setGroupRule}
        />
      )}
    </div>
  )
}
