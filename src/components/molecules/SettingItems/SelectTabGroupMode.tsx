import React, { useEffect } from 'react'
import MenuItem from '@mui/material/MenuItem'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import type { SelectChangeEvent } from '@mui/material/Select'
import { saveGroupModeSetting, getSavedGroupModeSetting } from '../../../common/libs/groupMode'
import { GROUP_MODE } from '../../../common/const/groupMode'

export default function SelectTabGroupMode(): JSX.Element {
    // グループ化する設定
    const [groupMode, setGroupMode] = React.useState<string>(GROUP_MODE.all)

    // 画面表示時にグループ化設定を取得
    useEffect(() => {
        void getSavedGroupModeSetting().then((value: string) => {
            setGroupMode(value)
        })
    }, [])

    const handleChange = (event: SelectChangeEvent): void => {
        void saveGroupModeSetting(event.target.value).then(() => {
            setGroupMode(event.target.value)
        })
    }

    return (
        <ListItem>
            <ListItemText id="list-label-Mode" primary="GroupMode" />
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={groupMode}
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
