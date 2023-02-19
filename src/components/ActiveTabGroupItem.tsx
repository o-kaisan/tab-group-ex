import React from 'react'
import ListItemText from '@mui/material/ListItemText'
import SaveAltIcon from '@mui/icons-material/SaveAlt'
import OptionMenus from './OptionMenus'
import { IconButton, ListItem, ListItemButton, Input } from '@mui/material'
import {
  saveTabGroup,
  toggleTabGroupCollapsed,
  updateTabGroupName
} from '../utils/tabGroups'
import CheckIcon from '@mui/icons-material/Check'
import ClearIcon from '@mui/icons-material/Clear'

interface Props {
  // タブグループID
  id: number
  // タブグループの開閉
  collapsed: boolean
  // タブグループのタイトル
  title?: string
  // getSavedTabGroupList
  // eslint-disable-next-line @typescript-eslint/ban-types
  getSavedTabGroupList: Function
  // updatedTabGroupListメソッド
  // eslint-disable-next-line @typescript-eslint/ban-types
  updatedTabGroupList: Function
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function ActiveTabGroupItem(props: Props) {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const resolveTitle = (title: string | undefined) => {
    if (title === undefined) {
      title = 'none title'
    }
    return title
  }
  const _title = resolveTitle(props.title)
  const [editMode, setEditMode] = React.useState(false)
  const [tabGroupTitle, setTabGroupTitle] = React.useState(_title)

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const runUpdateTabGroupCollapsed = (
    tabGroupId: number,
    collapsed: boolean
  ) => {
    void toggleTabGroupCollapsed(tabGroupId, !collapsed)
    props.updatedTabGroupList()
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const runSaveTabGroup = (tabGroupId: number, tabGroupTitle: string) => {
    void saveTabGroup(tabGroupId, tabGroupTitle).then(() =>
      props.getSavedTabGroupList()
    )
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const runUpdateTabGroupName = (tabGroupId: number, tabGroupTitle: string) => {
    void updateTabGroupName(tabGroupId, tabGroupTitle).then(() =>
      props.updatedTabGroupList()
    )
    setEditMode(false)
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const cancelEditMode = () => {
    setEditMode(false)
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTabGroupTitle(event.target.value)
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.nativeEvent.isComposing || event.key !== 'Enter') return
    setTabGroupTitle(tabGroupTitle)
    runUpdateTabGroupName(props.id, tabGroupTitle)
  }
  return (
    <div>
      {editMode ? (
        <ListItem>
          <Input
            defaultValue={props.title}
            inputProps={{
              placeholder: 'Tab Group Name',
              onChange: handleChange,
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
      ) : (
        <ListItem>
          <ListItemButton
            sx={{ pl: 4 }}
            onClick={() => {
              runUpdateTabGroupCollapsed(props.id, props.collapsed)
            }}
          >
            <ListItemText>{props.title}</ListItemText>
          </ListItemButton>
          <IconButton
            onClick={() => {
              runSaveTabGroup(props.id, _title)
            }}
          >
            <SaveAltIcon />
          </IconButton>
          <OptionMenus
            tabGroupId={props.id}
            updatedTabGroupList={props.updatedTabGroupList}
            setEditMode={setEditMode}
          />
        </ListItem>
      )}
    </div>
  )
}
