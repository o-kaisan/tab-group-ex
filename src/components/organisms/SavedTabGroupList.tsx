import React from 'react'
import { List, ListSubheader } from '@mui/material'
import type { SavedTabGroupInfo } from '../../common/types/savedTabGroupInfo'
import SavedTabGroupItem from '../../components/molecules/SavedTabGroupItem/SavedTabGroupItem'
import NoListItem from '../molecules/NoListItem/NoListItem'

interface Props {
    savedTabGroup: SavedTabGroupInfo[]
    updateSavedTabGroupList: Function
    updateCurrentTabGroupList: Function
}

export default function SavedTabGroupList(props: Props): JSX.Element {
    return (
        <List>
            <ListSubheader>Saved TabGroups</ListSubheader>
            {props.savedTabGroup.length > 0 ? (
                props.savedTabGroup.map((tabGroup) => (
                    <SavedTabGroupItem
                        key={tabGroup.tabGroupId}
                        tabGroupId={tabGroup.tabGroupId}
                        tabGroupTitle={tabGroup.title}
                        urlList={tabGroup.urlList}
                        updateSavedTabGroupList={props.updateSavedTabGroupList}
                        updateCurrentTabGroupList={props.updateCurrentTabGroupList}
                    />
                ))
            ) : (
                <NoListItem />
            )}
        </List>
    )
}
