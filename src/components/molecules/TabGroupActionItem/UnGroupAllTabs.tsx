import React from 'react'
import ListItemText from '@mui/material/ListItemText'
import StyledListItemIcon from './StyledListItemIcon'
import StyledListItem from './StyledListItem'
import StyledListItemButton from './StyledListItemButton'
import LayersClearIcon from '@mui/icons-material/LayersClear'
import { ungroupAllTabs } from '../../../common/libs/tabGroup'
import ShortcutKeyItem from './ShortcutKeyItem'

interface Props {
    updateCurrentTabGroupList: Function
    shortcutKey: string
}

export default function UngroupAllTabs(props: Props): JSX.Element {
    /*
     * タブをグループ化
     */
    const handleClick = (): void => {
        ungroupAllTabs()
            .then(() => {
                // グループを更新する
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
                    <LayersClearIcon fontSize="small" />
                </StyledListItemIcon>
                <ListItemText>Ungroup all</ListItemText>
                <ShortcutKeyItem shortcutKey={props.shortcutKey} />
            </StyledListItemButton>
        </StyledListItem>
    )
}
