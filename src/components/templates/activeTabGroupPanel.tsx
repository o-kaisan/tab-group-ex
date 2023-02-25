import React from 'react'
import ActiveTabGroupList from '../organisms/activeTabGroupList'
import GroupingFunctionList from '../../components/organisms/groupingFunctionList'
import type { GroupRule } from '../../common/interface/groupRule'
import type { SavedTabGroupInfo } from '../../common/interface/savedTabGroupInfo'
import TabPanel from '../atom/tabPanel'

/*
 * 拡張機能のメニュー
 */
interface Props {
  // 現在のタブ番号
  tab: number
  // 自身のタブ番号
  index: number
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

export default function ActiveTabGroupPanel(props: Props): JSX.Element {
  return (
    <TabPanel value={props.tab} index={props.index}>
      <GroupingFunctionList
        groupMode={props.groupMode}
        ignoreRule={props.ignoreRule}
        groupRule={props.groupRule}
        setSavedTabGroup={props.setSavedTabGroup}
        updatedTabGroupList={props.updatedTabGroupList}
        getSavedTabGroupList={props.getSavedTabGroupList}
        activeTabGroup={props.activeTabGroup}
      />
      <ActiveTabGroupList
        activeTabGroup={props.activeTabGroup}
        getSavedTabGroupList={props.getSavedTabGroupList}
        updatedTabGroupList={props.updatedTabGroupList}
      />
    </TabPanel>
  )
}
