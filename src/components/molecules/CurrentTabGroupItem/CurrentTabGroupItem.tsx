import React from 'react'
import EditCurrentTabGroup from './EditCurrentTabGroup'
import DisplayCurrentTabGroup from './DisplayCurrentTabGroup'

interface Props {
  // タブグループID
  id: number
  // タブグループの開閉
  collapsed: boolean
  // タブグループのタイトル
  title?: string
  // getSavedTabGroupList
  getSavedTabGroupList: Function
  // updateCurrentTabGroupListメソッド
  updateCurrentTabGroupList: Function
}

export default function CurrentTabGroupItem(props: Props): JSX.Element {
  const resolveTitle = (title: string | undefined): string => {
    if (title === undefined) {
      title = 'none title'
    }
    return title
  }
  const _title = resolveTitle(props.title)

  const [editMode, setEditMode] = React.useState(false)

  return (
    <div>
      {editMode ? (
        <EditCurrentTabGroup
          id={props.id}
          title={_title}
          setEditMode={setEditMode}
          updateCurrentTabGroupList={props.updateCurrentTabGroupList}
        />
      ) : (
        <DisplayCurrentTabGroup
          id={props.id}
          collapsed={props.collapsed}
          title={_title}
          setEditMode={setEditMode}
          getSavedTabGroupList={props.getSavedTabGroupList}
          updateCurrentTabGroupList={props.updateCurrentTabGroupList}
        />
      )}
    </div>
  )
}
