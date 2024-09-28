import React from 'react'
import StyledList from './StyledList'
import { ListSubheader } from '@mui/material'
import GroupCurrentTabs from '../molecules/TabGroupFunctionItem/GroupCurrentTabs'
import UnGroupAllTabs from '../molecules/TabGroupFunctionItem/UnGroupAllTabs'

interface Props {
    updateCurrentTabGroupList: Function
}

export default function TabGroupFunctionList(props: Props): JSX.Element {
    return (
        <StyledList>
            <ListSubheader>Action</ListSubheader>
            <GroupCurrentTabs updateCurrentTabGroupList={props.updateCurrentTabGroupList} />
            <UnGroupAllTabs updateCurrentTabGroupList={props.updateCurrentTabGroupList} />
        </StyledList>
    )
}
