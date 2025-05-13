import React, { type ReactNode } from 'react'
import ListItemText from '@mui/material/ListItemText'
import StyledListItem from './StyledListItem'
import StyledListItemButton from './StyledListItemButton'
import ShortcutKeyItem from './ShortcutKeyItem'
import { groupTabs } from '../../../common/libs/tabGroup'
import StyledListItemIcon from './StyledListItemIcon'

interface Props {
    title: string
    actionType: string
    shortcutKey: string
    updateCurrentTabGroupList: () => void
    children: ReactNode
}

export default function GroupCurrentTabs(props: Props): JSX.Element {
    /*
     * タブをグループ化
     */
    const handleClick = (): void => {
        groupTabs(props.actionType)
            .then(() => {
                // 現在表示しているタブを取得
                props.updateCurrentTabGroupList()

            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <StyledListItem>
            <StyledListItemButton onClick={handleClick}>
                <StyledListItemIcon>
                    {props.children}
                </StyledListItemIcon>
                <ListItemText>{props.title}</ListItemText>
                <ShortcutKeyItem shortcutKey={props.shortcutKey} />
            </StyledListItemButton>
        </StyledListItem>
    )
}
