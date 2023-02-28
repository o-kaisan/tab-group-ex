import React from 'react'
import List from '@mui/material/List'
import ListSubheader from '@mui/material/ListSubheader'
import SelectTabGroupMode from '../molecules/SettingItems/SelectTabGroupMode'
import type { GroupRule } from '../../common/types/groupRule'

interface Props {
    groupMode: string
    setGroupMode: React.Dispatch<React.SetStateAction<string>>
    groupRule: GroupRule[]
    setGroupRule: React.Dispatch<React.SetStateAction<GroupRule[]>>
}

export default function SettingList(props: Props): JSX.Element {
    return (
        <List>
            <ListSubheader>Settings</ListSubheader>
            <SelectTabGroupMode groupMode={props.groupMode} setGroupMode={props.setGroupMode} />
        </List>
    )
}
