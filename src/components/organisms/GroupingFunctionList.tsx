import React from 'react'
import List from '@mui/material/List'
import { ListSubheader } from '@mui/material'
import GroupCurrentTabs from '../molecules/GroupingFunctionItem/GroupCurrentTabs'
import type { GroupRule } from '../../common/types/groupRule'
import type { SavedTabGroupInfo } from '../../common/types/savedTabGroupInfo'

interface Props {
    groupMode: string
    groupRule: GroupRule[]
    setSavedTabGroup: React.Dispatch<React.SetStateAction<SavedTabGroupInfo[]>>
    updateCurrentTabGroupList: Function
    updateSavedTabGroupList: Function
}

export default function GroupingFunctionList(props: Props): JSX.Element {
    return (
        <List>
            <ListSubheader>Grouping</ListSubheader>
            <GroupCurrentTabs
                groupMode={props.groupMode}
                groupRule={props.groupRule}
                setSavedTabGroup={props.setSavedTabGroup}
                updateCurrentTabGroupList={props.updateCurrentTabGroupList}
                updateSavedTabGroupList={props.updateSavedTabGroupList}
            />
        </List>
    )
}
