import React from 'react'
import DisplaySavedTabGroupItem from './DisplaySavedTabGroupItem'
import EditSavedTabGroupItem from './EditSavedTabGroupItem'

interface Props {
    tabGroupId: number
    tabGroupTitle: string
    urlList: string[]
    updateSavedTabGroupList: Function
}

export default function SavedTabGroupItem(props: Props): JSX.Element {
    const [editMode, setEditMode] = React.useState(false)

    return (
        <div>
            {editMode ? (
                <EditSavedTabGroupItem
                    tabGroupId={props.tabGroupId}
                    tabGroupTitle={props.tabGroupTitle}
                    setEditMode={setEditMode}
                    updateSavedTabGroupList={props.updateSavedTabGroupList}
                />
            ) : (
                <DisplaySavedTabGroupItem
                    tabGroupId={props.tabGroupId}
                    tabGroupTitle={props.tabGroupTitle}
                    urlList={props.urlList}
                    setEditMode={setEditMode}
                    updateSavedTabGroupList={props.updateSavedTabGroupList}
                />
            )}
        </div>
    )
}
