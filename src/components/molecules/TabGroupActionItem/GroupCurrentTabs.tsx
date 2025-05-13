import React, { type ReactNode } from 'react'
import ListItemText from '@mui/material/ListItemText'
import StyledListItem from './StyledListItem'
import StyledListItemButton from './StyledListItemButton'
import { groupTabs } from '../../../common/libs/tabGroup'
import StyledListItemIcon from './StyledListItemIcon'
import type { GroupMode } from '../../../common/types/groupMode'

interface Props {
    title: string
    groupMode: GroupMode
    updateCurrentTabGroupList: () => void
    children: ReactNode
}

export default function GroupCurrentTabs(props: Props): JSX.Element {
    /*
     * タブをグループ化
     */
    const handleClick = (): void => {
        groupTabs(props.groupMode)
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
            </StyledListItemButton>
        </StyledListItem>
    )
}
