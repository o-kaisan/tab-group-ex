import React, { useEffect, useState } from 'react'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import FormControl from '@mui/material/FormControl'
import Switch from '@mui/material/Switch'
import { saveAutoGroup, getAutoGroup } from '../../../common/libs/autoGroup'
import { GROUP_MODE } from '../../../common/types/groupMode'

interface Props {
    groupMode: string
}

export default function AutoGroupSwitch(props: Props): JSX.Element {
    // 自動タブグループ設定
    const [autoGroup, setAutoGroup] = useState(false)

    // 画面表示時にストレージに保存された自動グルーピング設定を読み込む
    useEffect(() => {
        void getAutoGroup().then((value: boolean) => {
            setAutoGroup(value)
        })
    }, [])

    const switchHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
        void saveAutoGroup(event.target.checked).then(() => {
            setAutoGroup(!event.target.checked)
        })
    }

    const disabled = props.groupMode !== GROUP_MODE.domain && props.groupMode !== GROUP_MODE.customDomain

    return (
        <ListItem>
            <ListItemText
                id="list-label-Mode"
                primary="Auto Grouping"
                sx={disabled ? { color: '#bdbdbd' } : { color: 'black' }}
            />
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <Switch checked={autoGroup} onChange={switchHandler} disabled={disabled} />
            </FormControl>
        </ListItem>
    )
}
