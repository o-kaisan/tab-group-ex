import React from 'react'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import { ListItem, ListItemButton } from '@mui/material'
import LayersIcon from '@mui/icons-material/Layers'
import { groupCurrentTabs } from '../../../common/libs/tabGroup'
import { getSavedGroupModeSetting } from '../../../common/libs/groupMode'
import { getSavedGroupRule } from '../../../common/libs/groupRule'

interface Props {
    updateCurrentTabGroupList: Function
}

export default function GroupCurrentTabs(props: Props): JSX.Element {
    /*
     * タブをグループ化
     */
    const handleClick = (): void => {
        getSavedGroupModeSetting().then((groupMode) => {
            void getSavedGroupRule().then((groupRules) => {
                groupCurrentTabs(groupMode, groupRules).then(() => {
                    props.updateCurrentTabGroupList()
                }).catch((error) => { console.log(error) })
            }).catch((error) => { console.log(error) })
        }).catch((error) => { console.log(error) })
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
