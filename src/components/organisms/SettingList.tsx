import React, { useEffect } from 'react'
import List from '@mui/material/List'
import ListSubheader from '@mui/material/ListSubheader'
import SelectTabGroupMode from '../molecules/SettingItems/SelectTabGroupMode'
import { GROUP_MODE } from '../../common/types/groupMode'
import { getGroupMode } from '../../common/libs/groupMode'

export default function SettingList(): JSX.Element {
    // グループ化する設定
    const [groupMode, setGroupMode] = React.useState<string>(GROUP_MODE.all)

    // 画面表示時にグループ化設定を取得
    useEffect(() => {
        void getGroupMode().then((value: string) => {
            setGroupMode(value)
        })
    }, [])

    return (
        <List>
            <ListSubheader>Settings</ListSubheader>
            <SelectTabGroupMode groupMode={groupMode} setGroupMode={setGroupMode} />
        </List>
    )
}
