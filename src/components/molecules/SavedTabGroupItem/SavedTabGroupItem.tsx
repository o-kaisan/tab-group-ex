import React from 'react'
import DisplaySavedTabGroupItem from './DisplaySavedTabGroupItem'
import EditSavedTabGroupItem from './EditSavedTabGroupItem'
import type { SavedTabGroupInfo } from '../../../common/types/savedTabGroupInfo'

interface Props {
    savedTabGroup: SavedTabGroupInfo
    updateSavedTabGroupList: Function
    isOpen: boolean
    setOpenIds: Function
}

export default function SavedTabGroupItem(props: Props): JSX.Element {
    const [editMode, setEditMode] = React.useState(false)

    return (
        <div>
            {editMode ? (
                <EditSavedTabGroupItem
                    savedTabGroup={props.savedTabGroup}
                    setEditMode={setEditMode}
                    updateSavedTabGroupList={props.updateSavedTabGroupList}
                />
            ) : (
                <DisplaySavedTabGroupItem
                    savedTabGroup={props.savedTabGroup}
                    updateSavedTabGroupList={props.updateSavedTabGroupList}
                    isOpen={props.isOpen}
                    setOpenIds={props.setOpenIds}
                />
            )}
        </div>
    )
}
