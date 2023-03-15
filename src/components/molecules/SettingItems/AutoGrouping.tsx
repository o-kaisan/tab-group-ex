import React, { useEffect, useState } from 'react'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import FormControl from '@mui/material/FormControl'
import Switch from '@mui/material/Switch';
import { saveAutoGroupingSetting, getAutoGroupingSetting } from '../../../common/libs/autoGrouping'

export default function AutoGroupingSwitch(): JSX.Element {
    // 自動タブグループ設定
    const [autoGrouping, setAutoGrouping] = useState(false);

    // 画面表示時にストレージに保存された自動グルーピング設定を読み込む
    useEffect(() => {
        void getAutoGroupingSetting().then((value: boolean) => {
            setAutoGrouping(value)
        })
    }, [])


    const switchHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
        void saveAutoGroupingSetting(event.target.checked).then(() => {
            setAutoGrouping(!event.target.checked)
        });
    };

    return (
        <ListItem>
            <ListItemText id="list-label-Mode" primary="Auto Grouping" />
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <Switch checked={autoGrouping} onChange={switchHandler} />
            </FormControl>
        </ListItem>
    );
}