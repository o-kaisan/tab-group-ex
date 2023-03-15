import React from 'react'
import List from '@mui/material/List'
import ListSubheader from '@mui/material/ListSubheader'
import SelectTabGroupMode from '../molecules/SettingItems/SelectTabGroupMode'
import AutoGroupingSwitch from '../molecules/SettingItems/AutoGrouping'

export default function SettingList(): JSX.Element {
    return (
        <List>
            <ListSubheader>Settings</ListSubheader>
            <SelectTabGroupMode />
            <AutoGroupingSwitch />
        </List>
    )
}
