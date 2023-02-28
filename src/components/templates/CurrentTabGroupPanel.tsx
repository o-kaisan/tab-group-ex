import React from 'react'
import CurrentTabGroupList from '../organisms/CurrentTabGroupList'
import GroupingFunctionList from '../../components/organisms/GroupingFunctionList'
import type { GroupRule } from '../../common/types/groupRule'
import type { SavedTabGroupInfo } from '../../common/types/savedTabGroupInfo'
import TabPanel from '../atom/TabPanel'

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
  updateCurrentTabGroupList: Function
  // タブグループの取得処理
  getSavedTabGroupList: Function
  // タブグループの一覧
  currentTabGroups: chrome.tabGroups.TabGroup[]
}

export default function CurrentTabGroupPanel(props: Props): JSX.Element {
  return (
    <TabPanel value={props.tab} index={props.index}>
      <GroupingFunctionList
        groupMode={props.groupMode}
        ignoreRule={props.ignoreRule}
        groupRule={props.groupRule}
        setSavedTabGroup={props.setSavedTabGroup}
        updateCurrentTabGroupList={props.updateCurrentTabGroupList}
        getSavedTabGroupList={props.getSavedTabGroupList}
      />
      <CurrentTabGroupList
        currentTabGroups={props.currentTabGroups}
        getSavedTabGroupList={props.getSavedTabGroupList}
        updateCurrentTabGroupList={props.updateCurrentTabGroupList}
      />
    </TabPanel>
  )
}
