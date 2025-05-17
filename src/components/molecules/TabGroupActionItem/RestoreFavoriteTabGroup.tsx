import React from 'react'
import ListItemText from '@mui/material/ListItemText'
import StyledListItemIcon from './StyledListItemIcon'
import StyledListItem from './StyledListItem'
import StyledListItemButton from './StyledListItemButton'
import ShortcutKeyItem from './ShortcutKeyItem'
import { sendRestoreGroupMessageToTab } from '../../../common/libs/message'
import { restoreFavoriteTabGroup } from '../../../common/libs/savedTabGroup'
import RestorePageIcon from '@mui/icons-material/RestorePage';

interface Props {
    updateCurrentTabGroupList: () => void
    shortcutKey: string
}

export default function RestoreFavoriteSavedTabGroup(props: Props): JSX.Element {
    /**
     * タブをグループ化
     */
    const handleClick = (): void => {
        restoreFavoriteTabGroup((result) => {
            // content_scriptにメッセージを送信
            if (result) {
                void sendRestoreGroupMessageToTab()

            }
        }).then(() => {
            // 表示を更新
            props.updateCurrentTabGroupList()
        }).catch((e) => { console.log(e) })
    }
    return (
        <StyledListItem>
            <StyledListItemButton onClick={handleClick}>
                <StyledListItemIcon>
                    <RestorePageIcon fontSize="small" />
                </StyledListItemIcon>
                <ListItemText>Restore favorite group</ListItemText>
                <ShortcutKeyItem shortcutKey={props.shortcutKey} />
            </StyledListItemButton>
        </StyledListItem>
    )
}
