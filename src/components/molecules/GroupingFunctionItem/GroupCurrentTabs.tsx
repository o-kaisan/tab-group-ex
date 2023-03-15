import React from 'react'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import { ListItem, ListItemButton } from '@mui/material'
import LayersIcon from '@mui/icons-material/Layers'
import { groupCurrentTabs } from '../../../common/libs/tabGroup'
import type { GroupRule } from '../../../common/types/groupRule'
import type { SavedTabGroupInfo } from '../../../common/types/savedTabGroupInfo'
import { getSavedGroupModeSetting } from '../../../common/libs/groupMode'

interface Props {
    groupRule: GroupRule[]
    setSavedTabGroup: React.Dispatch<React.SetStateAction<SavedTabGroupInfo[]>>
    updateCurrentTabGroupList: Function
    updateSavedTabGroupList: Function
}

export default function GroupCurrentTabs(props: Props): JSX.Element {
    /*
     * タブをグループ化
     */
    const handleClick = (): void => {
        getSavedGroupModeSetting().then((groupMode) => {
            groupCurrentTabs(groupMode, props.groupRule)
                .then(() => {
                    props.updateCurrentTabGroupList()
                })
                .catch((error) => { console.log(error) })
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
