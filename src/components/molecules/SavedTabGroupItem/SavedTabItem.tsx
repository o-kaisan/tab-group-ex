import React from 'react'
import { ListItem } from '@mui/material'
import ListItemText from '@mui/material/ListItemText'
import type { Url } from '../../../common/types/savedTabGroupInfo'
import { deleteUrl } from '../../../common/libs/savedTabGroup'
import RestoreIconX from '../../atoms/Icons/RestoreIcon'
import { createTab } from '../../../common/libs/tab'
import PublicIcon from '@mui/icons-material/Public'
import SimpleDeleteIcon from '../../../components/atoms/Icons/SimpleDeleteIcon'
import { sendDeleteSavedTabMessageToTab, sendRestoreTabMessageToTab } from '../../../common/libs/message'

interface Props {
    index: number
    tabGroupTitle: string
    tabGroupId: number
    url: Url
    updateSavedTabGroupList: Function
}

export default function SavedTabItem(props: Props): JSX.Element {
    const handleRestoreIconClick = (url: Url): void => {
        createTab(url.url).then(() => {
            sendRestoreTabMessageToTab().catch((e) => { console.log(e) })
        }).catch((e) => {
            console.log(e)
        })
    }

    const handleDeleteIconClick = (tabGroupTitle: string, tabGroupId: number, index: number): void => {
        void deleteUrl(tabGroupTitle, tabGroupId, index).then(() => {
            // 表示の更新
            props.updateSavedTabGroupList()

            // context_scriptにメッセージを渡す
            sendDeleteSavedTabMessageToTab().catch((e) => { console.log(e) })
        })
    }

    return (
        <ListItem sx={{ pl: 4 }} style={{ padding: '3px 8px' }}>
            <img
                style={{ margin: '0 0.5rem 0 0', width: '1.2rem' }}
                src={props.url.favIconUrl}
                alt={props.url.favIconUrl}
                onError={(e: any) => {
                    e.target.src = <PublicIcon />
                    e.target.alt = <PublicIcon />
                }}
            />
            <ListItemText primary={props.url.title} />
            <RestoreIconX
                onClick={() => {
                    handleRestoreIconClick(props.url)
                }}
            />
            <SimpleDeleteIcon
                onClick={() => {
                    handleDeleteIconClick(props.tabGroupTitle, props.tabGroupId, props.index)
                }}
            />
        </ListItem>
    )
}
