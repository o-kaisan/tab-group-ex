import React from 'react'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import PublicIcon from '@mui/icons-material/Public'
import { ListItem } from '@mui/material'
import SimpleDeleteIcon from '../../atoms/Icons/SimpleDeleteIcon'
import { moveToTargetTab, removeTab } from '../../../common/libs/tab'
import { sendCloseTabMessageToTab } from '../../../common/libs/message'

interface Props {
    tab: chrome.tabs.Tab
    groupId: number
    updateTabs: Function
    updateCurrentTabGroupList: Function
}

export default function CurrentTabItem(props: Props): JSX.Element {
    const handleOnClickUrl = (tab: chrome.tabs.Tab): void => {
        if (tab.id === undefined) {
            return
        }
        moveToTargetTab(tab.id).catch((e) => {
            console.log(e)
        })
    }

    const handleOnClickDelete = (tab: chrome.tabs.Tab, groupId: number): void => {
        if (tab.id === undefined) {
            return
        }
        removeTab(tab.id, groupId)
            .then(() => {
                // 表示を更新
                props.updateCurrentTabGroupList()

                // content/content.tsにメッセージを渡す
                sendCloseTabMessageToTab().catch((e) => { console.log(e) })
            })
            .catch((e) => {
                console.log(e)
            })
        props.updateTabs(props.groupId)
    }

    return (
        <ListItem>
            <ListItemButton
                sx={{ pl: 4 }}
                style={{ padding: '3px 8px' }}
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
                        e.target.alt = <PublicIcon />
                    }}
                />
                <ListItemText primary={props.tab.title} />
            </ListItemButton>
            <SimpleDeleteIcon
                onClick={() => {
                    handleOnClickDelete(props.tab, props.groupId)
                }}
            />
        </ListItem>
    )
}
