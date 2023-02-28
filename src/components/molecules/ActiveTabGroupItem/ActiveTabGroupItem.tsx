import React from 'react'
import EditActiveTabGroup from './EditActiveTabGroup'
import DisplayActiveTabGroup from './DisplayActiveTabGroup'

interface Props {
  // タブグループID
  id: number
  // タブグループの開閉
  collapsed: boolean
  // タブグループのタイトル
  title?: string
  // getSavedTabGroupList
  getSavedTabGroupList: Function
  // updatedTabGroupListメソッド
  updatedTabGroupList: Function
}

export default function ActiveTabGroupItem(props: Props): JSX.Element {
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
        <EditActiveTabGroup
          id={props.id}
          title={_title}
          setEditMode={setEditMode}
          updatedTabGroupList={props.updatedTabGroupList}
        />
      ) : (
        <DisplayActiveTabGroup
          id={props.id}
          collapsed={props.collapsed}
          title={_title}
          setEditMode={setEditMode}
          getSavedTabGroupList={props.getSavedTabGroupList}
          updatedTabGroupList={props.updatedTabGroupList}
        />
      )}
    </div>
  )
}
