import React from 'react'
import MenuItem from '@mui/material/MenuItem'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import type { SelectChangeEvent } from '@mui/material/Select'
import { saveGroupMode } from '../../../common/libs/groupMode'
import { GROUP_MODE } from '../../../common/const/groupMode'

interface Props {
    groupMode: string
    setGroupMode: React.Dispatch<React.SetStateAction<string>>
}

export default function SelectTabGroupMode(props: Props): JSX.Element {
    const handleChange = (event: SelectChangeEvent): void => {
        void saveGroupMode(event.target.value).then(() => {
            props.setGroupMode(event.target.value)
        })
    }

    return (
        <ListItem>
            <ListItemText id="list-label-Mode" primary="GroupMode" />
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={props.groupMode}
                    onChange={handleChange}
                    label="GroupMode"
                >
                    <MenuItem value={GROUP_MODE.all}>{GROUP_MODE.all}</MenuItem>
                    <MenuItem value={GROUP_MODE.domain}>{GROUP_MODE.domain}</MenuItem>
                    <MenuItem value={GROUP_MODE.customDomain}>{GROUP_MODE.customDomain}</MenuItem>
                </Select>
            </FormControl>
        </ListItem>
    )
}
