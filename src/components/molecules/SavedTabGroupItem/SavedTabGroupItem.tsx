import React from 'react'
import DisplaySavedTabGroupItem from './DisplaySavedTabGroupItem'
import type { SavedTabGroupInfo } from '../../../common/types/savedTabGroupInfo'

interface Props {
    savedTabGroup: SavedTabGroupInfo
    updateSavedTabGroupList: Function
    isOpen: boolean
    setOpenIds: Function
}

export default function SavedTabGroupItem(props: Props): JSX.Element {
    return (
        <div>
            <DisplaySavedTabGroupItem
                savedTabGroup={props.savedTabGroup}
                updateSavedTabGroupList={props.updateSavedTabGroupList}
                isOpen={props.isOpen}
                setOpenIds={props.setOpenIds}
            />
        </div>
    )
}
