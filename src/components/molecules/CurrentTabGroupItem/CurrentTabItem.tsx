import React from 'react'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import { activedTab, removeTab } from '../../../common/libs/tab'
import DeleteIcon from '../../atoms/Icons/DeleteIcon'
import PublicIcon from '@mui/icons-material/Public'

interface Props {
    tab: chrome.tabs.Tab
    groupId: number
    updateTabs: Function
}

export default function CurrentTabItem(props: Props): JSX.Element {
    const handleOnClickUrl = (tab: chrome.tabs.Tab): void => {
        if (tab.id === undefined) {
            return
        }
        activedTab(tab.id).catch((e) => {
            console.log(e)
        })
    }

    const handleOnClickDelete = (tab: chrome.tabs.Tab): void => {
        if (tab.id === undefined) {
            return
        }
        removeTab(tab.id).catch((e) => {
            console.log(e)
        })
        props.updateTabs(props.groupId)
    }

    return (
        <ListItemButton
            sx={{ pl: 4 }}
            onClick={() => {
                handleOnClickUrl(props.tab)
            }}
        >
            <img
                style={{ margin: '0 0.5rem 0 0', width: '1.2rem' }}
                src={props.tab.favIconUrl}
                alt={props.tab.favIconUrl}
                onError={(e: any) => {
                    e.target.src = <PublicIcon />
                }}
            />
            <ListItemText primary={props.tab.title} />
            <DeleteIcon
                onClick={() => {
                    handleOnClickDelete(props.tab)
                }}
            />
        </ListItemButton>
    )
}
