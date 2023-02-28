import React from 'react'
import { IconButton, ListItem, Input } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import ClearIcon from '@mui/icons-material/Clear'
import { updateSavedTabGroupName } from '../../../common/utils/tabGroups'

interface Props {
  // タブグループID
  id: number
  // タブグループのタイトル
  title: string
  // 編集モード
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>
  // 保存されたタブグループの更新
  getSavedTabGroupList: Function
}

export default function EditSavedTabGroupItem(props: Props): JSX.Element {
  // 変更前の名前
  const [title, setTitle] = React.useState(props.title)
  // 変更後の名前
  const [renamedTitle, setRenamedTitle] = React.useState(props.title)

  const updateSavedTabGroupTitle = (
    id: number,
    title: string,
    renamedTitle: string
  ): void => {
    // ストレージの更新
    void updateSavedTabGroupName(id, title, renamedTitle).then(() => {
      setTitle(renamedTitle)
      props.getSavedTabGroupList()
      props.setEditMode(false)
    })

    // titleを更新
    setTitle(renamedTitle)
  }

  const cancelEditMode = (): void => {
    props.setEditMode(false)
  }

  const handleTextChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setRenamedTitle(event.target.value)
  }

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    //  Enterキー押下時でもグループ名の更新処理が走る
    if (event.nativeEvent.isComposing || event.key !== 'Enter') return
    updateSavedTabGroupTitle(props.id, title, renamedTitle)
  }

  return (
    <ListItem>
      <Input
        defaultValue={props.title}
        inputProps={{
          placeholder: 'Saved Tab Group Name',
          onChange: handleTextChange,
          onKeyDown: handleKeyDown
        }}
      />
      <IconButton
        onClick={() => {
          updateSavedTabGroupTitle(props.id, title, renamedTitle)
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
