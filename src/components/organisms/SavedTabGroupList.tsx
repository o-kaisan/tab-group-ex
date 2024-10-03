import React from 'react'
import { List, ListSubheader } from '@mui/material'
import DisplaySavedTabGroupItem from '../molecules/SavedTabGroupItem/DisplaySavedTabGroupItem'
import NoListItem from '../molecules/NoListItem/NoListItem'
import type { SavedTabGroupInfo } from '../../common/types/savedTabGroupInfo'


interface Props {
    savedTabGroups: SavedTabGroupInfo[]
    updateSavedTabGroupList: Function
}

export default function SavedTabGroupList(props: Props): JSX.Element {

    return (
        <List>
            <ListSubheader>Saved TabGroups</ListSubheader>
            {props.savedTabGroups.length > 0 ? (
                props.savedTabGroups.map((tabGroup) => (
                    <DisplaySavedTabGroupItem
                        key={tabGroup.tabGroupId}
                        savedTabGroup={tabGroup}
                        updateSavedTabGroupList={props.updateSavedTabGroupList}
                    />
                ))
            ) : (
                <NoListItem />
            )}
        </List>
    )
}
