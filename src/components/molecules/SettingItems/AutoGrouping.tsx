import React from "react";
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import FormControl from '@mui/material/FormControl'
import Switch from '@mui/material/Switch';
import { saveAutoGroupingSetting } from '../../../common/libs/autoGrouping'

interface Props {
    autoGrouping: boolean
    setAutoGrouping: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AutoGroupingSwitch(props: Props): JSX.Element {

    const switchHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
        void saveAutoGroupingSetting(event.target.checked).then(() => {
            props.setAutoGrouping(!event.target.checked)
        });
    };

    return (
        <ListItem>
            <ListItemText id="list-label-Mode" primary="Auto Grouping" />
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <Switch checked={props.autoGrouping} onChange={switchHandler} />
            </FormControl>
        </ListItem>
    );
}