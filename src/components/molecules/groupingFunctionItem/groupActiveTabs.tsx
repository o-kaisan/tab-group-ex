import React from 'react'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import { ListItem, ListItemButton } from '@mui/material'
import LayersIcon from '@mui/icons-material/Layers'
import { groupActiveTabs } from '../../../common/utils/tabGroups'
import type { GroupRule } from '../../../common/interface/groupRule'
import type { SavedTabGroupInfo } from '../../../common/interface/savedTabGroupInfo'

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

export default function GroupActiveTabs(props: Props): JSX.Element {
  /*
   * タブをグループ化
   */
  const runGroupActiveTabs = (): void => {
    groupActiveTabs(props.groupMode, props.groupRule, props.ignoreRule)
      .then(() => {
        props.updatedTabGroupList()
      })
      .catch((error) => {
        console.log(error)
      })
  }
  return (
    <ListItem>
      <ListItemButton onClick={runGroupActiveTabs}>
        <ListItemIcon>
          <LayersIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>タブをグループ化</ListItemText>
      </ListItemButton>
    </ListItem>
  )
}
