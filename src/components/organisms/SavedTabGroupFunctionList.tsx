import React from 'react'
import List from '@mui/material/List'
import { ListSubheader } from '@mui/material'
import DeleteAllSavedTabGroups from '../molecules/SavedTabGroupFunctionItem/DeleteAllSavedTabGroups'

interface Props {
    updateSavedTabGroupList: Function
}

export default function SavedTabGroupFunctionList(props: Props): JSX.Element {
    return (
        <List>
            <ListSubheader>Action</ListSubheader>
            <DeleteAllSavedTabGroups updateSavedTabGroupList={props.updateSavedTabGroupList} />
        </List>
    )
}
