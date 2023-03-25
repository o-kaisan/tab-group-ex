import React from 'react'
import List from '@mui/material/List'
import { ListSubheader } from '@mui/material'
import GroupCurrentTabs from '../molecules/GroupingFunctionItem/GroupCurrentTabs'
import UnGroupAllTabs from '../molecules/GroupingFunctionItem/UnGroupAllTabs'

interface Props {
    updateCurrentTabGroupList: Function
}

export default function GroupingFunctionList(props: Props): JSX.Element {
    return (
        <List>
            <ListSubheader>Action</ListSubheader>
            <GroupCurrentTabs updateCurrentTabGroupList={props.updateCurrentTabGroupList} />
            <UnGroupAllTabs updateCurrentTabGroupList={props.updateCurrentTabGroupList} />
        </List>
    )
}
