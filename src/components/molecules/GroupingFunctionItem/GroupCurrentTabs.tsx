import React from 'react'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import { ListItem, ListItemButton } from '@mui/material'
import LayersIcon from '@mui/icons-material/Layers'
import { groupTabs } from '../../../common/libs/tabGroup'
import { getGroupMode } from '../../../common/libs/groupMode'

interface Props {
    updateCurrentTabGroupList: Function
}

export default function GroupCurrentTabs(props: Props): JSX.Element {
    /*
     * タブをグループ化
     */
    const handleClick = (): void => {
        void getGroupMode().then((groupMode) => {
            groupTabs(groupMode)
                .then(() => {
                    props.updateCurrentTabGroupList()
                })
                .catch((error) => {
                    console.log(error)
                })
        })
    }
    return (
        <ListItem>
            <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                    <LayersIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>タブをグループ化</ListItemText>
            </ListItemButton>
        </ListItem>
    )
}
