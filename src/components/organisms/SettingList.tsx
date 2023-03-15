import React from 'react'
import List from '@mui/material/List'
import ListSubheader from '@mui/material/ListSubheader'
import SelectTabGroupMode from '../molecules/SettingItems/SelectTabGroupMode'
import type { GroupRule } from '../../common/types/groupRule'
import AutoGroupingSwitch from '../molecules/SettingItems/AutoGrouping'

interface Props {
    groupRule: GroupRule[]
    setGroupRule: React.Dispatch<React.SetStateAction<GroupRule[]>>
    autoGrouping: boolean
    setAutoGrouping: React.Dispatch<React.SetStateAction<boolean>>
}

export default function SettingList(props: Props): JSX.Element {
    return (
        <List>
            <ListSubheader>Settings</ListSubheader>
            <SelectTabGroupMode />
            <AutoGroupingSwitch autoGrouping={props.autoGrouping} setAutoGrouping={props.setAutoGrouping} />
        </List>
    )
}
