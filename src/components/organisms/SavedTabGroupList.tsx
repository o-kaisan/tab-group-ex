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

    const resolveSavedTabGroups = (tabGroups: SavedTabGroupInfo[]): SavedTabGroupInfo[] => {
        if (tabGroups === undefined) {
            return []
        }
        return tabGroups
    }
    const _savedTabGroups = resolveSavedTabGroups(props.savedTabGroups)

    return (
        <List>
            <ListSubheader>Saved TabGroups</ListSubheader>
            {_savedTabGroups.length > 0 ? (
                _savedTabGroups.map((tabGroup) => (
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
