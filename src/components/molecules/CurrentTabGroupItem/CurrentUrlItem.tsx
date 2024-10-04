import React from 'react'
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { activedTab } from '../../../common/libs/tab';

interface Props {
    tab: chrome.tabs.Tab
}

export default function CurrentLinkItem(props: Props): JSX.Element {

    const handleOnClick =  (tab: chrome.tabs.Tab):void => {
        if (tab.id === undefined) {
            return
        }
        activedTab(tab.id).catch((e)=>{console.log(e)})
    }
        
    return (
        <ListItemButton sx={{ pl: 4 }} onClick={() => {handleOnClick(props.tab)}}>
            <img style={{margin: '0 0.5rem 0 0', width: '1.2rem'}} src={props.tab.favIconUrl} alt={props.tab.favIconUrl}/>
            <ListItemText primary={props.tab.title} />
        </ListItemButton>
    )
}