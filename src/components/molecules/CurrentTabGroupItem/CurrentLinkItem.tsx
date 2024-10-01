import React from 'react'
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

interface Props {
    tab: chrome.tabs.Tab
}

export default function CurrentLinkItem(props: Props): JSX.Element {

    return (
        <ListItemButton sx={{ pl: 4 }}>
            <ListItemText primary={props.tab.title} />
        </ListItemButton>
    )
}