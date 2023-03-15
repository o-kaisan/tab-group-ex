import React from 'react'
import List from '@mui/material/List'
import { ListSubheader } from '@mui/material'
import GroupCurrentTabs from '../molecules/GroupingFunctionItem/GroupCurrentTabs'
import type { SavedTabGroupInfo } from '../../common/types/savedTabGroupInfo'

interface Props {
    setSavedTabGroup: React.Dispatch<React.SetStateAction<SavedTabGroupInfo[]>>
    updateCurrentTabGroupList: Function
    updateSavedTabGroupList: Function
}

export default function GroupingFunctionList(props: Props): JSX.Element {
    return (
        <List>
            <ListSubheader>Grouping</ListSubheader>
            <GroupCurrentTabs
                setSavedTabGroup={props.setSavedTabGroup}
                updateCurrentTabGroupList={props.updateCurrentTabGroupList}
                updateSavedTabGroupList={props.updateSavedTabGroupList}
            />
        </List>
    )
}
