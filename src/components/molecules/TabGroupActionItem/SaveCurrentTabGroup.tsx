import React from 'react'
import ListItemText from '@mui/material/ListItemText'
import StyledListItemIcon from './StyledListItemIcon'
import StyledListItem from './StyledListItem'
import StyledListItemButton from './StyledListItemButton'
import LayersClearIcon from '@mui/icons-material/LayersClear'
import ShortcutKeyItem from './ShortcutKeyItem'
import { sendMessageToTab, sendSaveMessageToTab } from '../../../common/libs/message'
import { saveCurrentTabGroupToStorage, saveTabGroup } from '../../../common/libs/savedTabGroup'
import { ActionType } from '../../../common/const/action'

interface Props {
    updateSavedTabGroupList: () => void
    shortcutKey: string
}

export default function SaveCurrentTabGroup(props: Props): JSX.Element {
    /**
     * タブをグループ化
     */
    const handleClick = (): void => {
        // TODO Promise連鎖してるのでリファクタリングしたい
        saveCurrentTabGroupToStorage((tabId) => {
            // content_scriptにメッセージを送信
            sendMessageToTab(tabId, { actionType: ActionType.save })
        }).then(() => {
            //表示を更新
            props.updateSavedTabGroupList()
        }).catch((e) => { console.log(e) })
    }
    return (
        <StyledListItem>
            <StyledListItemButton onClick={handleClick}>
                <StyledListItemIcon>
                    <LayersClearIcon fontSize="small" />
                </StyledListItemIcon>
                <ListItemText>Save current group </ListItemText>
                <ShortcutKeyItem shortcutKey={props.shortcutKey} />
            </StyledListItemButton>
        </StyledListItem>
    )
}
