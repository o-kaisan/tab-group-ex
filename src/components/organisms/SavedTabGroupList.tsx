import React from 'react'
import { List, ListSubheader } from '@mui/material'
import SavedTabGroupItem from '../../components/molecules/SavedTabGroupItem/SavedTabGroupItem'
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
                    <SavedTabGroupItem
                        key={tabGroup.tabGroupId}
                        tabGroupId={tabGroup.tabGroupId}
                        tabGroupTitle={tabGroup.title}
                        urlList={tabGroup.urlList}
                        updateSavedTabGroupList={props.updateSavedTabGroupList}
                    />
                ))
            ) : (
                <NoListItem />
            )}
        </List>
    )
}
