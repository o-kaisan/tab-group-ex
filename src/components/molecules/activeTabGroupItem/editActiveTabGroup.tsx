import React from 'react'
import { IconButton, ListItem, Input } from '@mui/material'
import { updateTabGroupName } from '../../../common/utils/tabGroups'
import CheckIcon from '@mui/icons-material/Check'
import ClearIcon from '@mui/icons-material/Clear'

interface Props {
  // タブグループID
  id: number
  // タブグループのタイトル
  title: string
  // 編集モード
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>
  // updatedTabGroupListメソッド
  updatedTabGroupList: Function
}

export default function EditActiveTabGroup(props: Props): JSX.Element {
  const [tabGroupTitle, setTabGroupTitle] = React.useState(props.title)

  const runUpdateTabGroupName = (
    tabGroupId: number,
    tabGroupTitle: string
  ): void => {
    void updateTabGroupName(tabGroupId, tabGroupTitle).then(() =>
      props.updatedTabGroupList()
    )
    props.setEditMode(false)
  }

  const cancelEditMode = (): void => {
    props.setEditMode(false)
  }

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setTabGroupTitle(event.target.value)
  }

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    //  Enterキー押下時でもグループ名の更新処理が走る
    if (event.nativeEvent.isComposing || event.key !== 'Enter') return
    setTabGroupTitle(tabGroupTitle)
    runUpdateTabGroupName(props.id, tabGroupTitle)
  }

  return (
    <ListItem>
      <Input
        defaultValue={tabGroupTitle}
        inputProps={{
          placeholder: 'Tab Group Name',
          onChange: handleTextChange,
          onKeyDown: handleKeyDown
        }}
      />
      <IconButton
        onClick={() => {
          runUpdateTabGroupName(props.id, tabGroupTitle)
        }}
      >
        <CheckIcon />
      </IconButton>
      <IconButton
        onClick={() => {
          cancelEditMode()
        }}
      >
        <ClearIcon />
      </IconButton>
    </ListItem>
  )
}
