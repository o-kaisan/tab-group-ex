import React, { useEffect, useState } from "react";
import { Switch } from "@mui/material";
import { getActionNotificationSetting, saveActionNotificationSetting } from '../../../common/libs/actionNotification';

export default function ActionNotificationSetting(): JSX.Element {
    const [isChecked, setIsChecked] = useState<boolean>(false)

    // 画面表示時にグループ化ルールを読み込む
    useEffect(() => {
        void getActionNotificationSetting().then((value: boolean) => {
            setIsChecked(value)
        }).catch((e) => { console.log(e) })
    }, [])

    const handleSwitchToggle = (isChecked: boolean): void => {
        saveActionNotificationSetting(!isChecked).then(() => {
            setIsChecked(!isChecked)
        }).catch((e) => { console.log(e) })
    }

    const ItemStyle = {
        paddingLeft: "15px",
        display: "flex",
    }

    const TextStyle = {
        margin: "0 0 0 0",
        padding: "8px 20px 0px 20px"
    }

    return (
        <div style={ItemStyle}>
            <p style={TextStyle} className="text-sm text-muted-foreground">Show snackbars on action</p>
            <Switch
                id="action-notifications"
                checked={isChecked}
                onChange={() => { handleSwitchToggle(isChecked) }}
            />
        </div >
    )
}