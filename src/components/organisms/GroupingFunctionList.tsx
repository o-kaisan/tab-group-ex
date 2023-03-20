import React from 'react'
import List from '@mui/material/List'
import { ListSubheader } from '@mui/material'
import GroupCurrentTabs from '../molecules/GroupingFunctionItem/GroupCurrentTabs'

interface Props {
    updateCurrentTabGroupList: Function
}

export default function GroupingFunctionList(props: Props): JSX.Element {
    return (
        <List>
            <ListSubheader>Grouping</ListSubheader>
            <GroupCurrentTabs updateCurrentTabGroupList={props.updateCurrentTabGroupList} />
        </List>
    )
}
