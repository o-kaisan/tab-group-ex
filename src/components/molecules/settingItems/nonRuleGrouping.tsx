import React from 'react'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Switch from '@mui/material/Switch'
import { saveIgnoreRule } from '../../../common/utils/tabGroupSettings'
interface Props {
  // 対象のドメイン以外のタブをグループ化するかの設定
  ignoreRule: boolean
  // グループ化対象のドメインの更新処理
  setIgnoreRule: React.Dispatch<React.SetStateAction<boolean>>
}

export default function NonRuleGrouping(props: Props): JSX.Element {
  const [checked, setChecked] = React.useState(props.ignoreRule)

  const handleToggle = (): void => {
    setChecked(!checked)
    props.setIgnoreRule(!checked)
    void saveIgnoreRule(!checked).then()
  }

  return (
    <ListItem>
      <ListItemText
        id="switch-list-label-ignoreRule"
        primary="ルール対象外のタブでグループ化"
      />
      <Switch edge="end" onChange={handleToggle} checked={checked} />
    </ListItem>
  )
}
