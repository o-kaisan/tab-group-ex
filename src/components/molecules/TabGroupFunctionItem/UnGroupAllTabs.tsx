import React from 'react'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import { ListItem, ListItemButton } from '@mui/material'
import LayersClearIcon from '@mui/icons-material/LayersClear'
import { ungroupAllTabs } from '../../../common/libs/tabGroup'

interface Props {
    updateCurrentTabGroupList: Function
}

export default function UngroupAllTabs(props: Props): JSX.Element {
    /*
     * タブをグループ化
     */
    const handleClick = (): void => {
        ungroupAllTabs()
            .then(() => {
                props.updateCurrentTabGroupList()
            })
            .catch((error) => {
                console.log(error)
            })
    }
    return (
        <ListItem>
            <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                    <LayersClearIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>タブグループを全て解除</ListItemText>
            </ListItemButton>
        </ListItem>
    )
}
