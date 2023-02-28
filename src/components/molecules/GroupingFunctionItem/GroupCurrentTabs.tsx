import React from 'react'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import { ListItem, ListItemButton } from '@mui/material'
import LayersIcon from '@mui/icons-material/Layers'
import { groupCurrentTabs } from '../../../common/utils/tabGroups'
import type { GroupRule } from '../../../common/types/groupRule'
import type { SavedTabGroupInfo } from '../../../common/types/savedTabGroupInfo'

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

export default function GroupCurrentTabs(props: Props): JSX.Element {
  /*
   * タブをグループ化
   */
  const handleClick = (): void => {
    groupCurrentTabs(props.groupMode, props.groupRule, props.ignoreRule)
      .then(() => {
        props.updateCurrentTabGroupList()
      })
      .catch((error) => {
        console.log(error)
      })
  }
  return (
    <ListItem>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <LayersIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>タブをグループ化</ListItemText>
      </ListItemButton>
    </ListItem>
  )
}
