import React from 'react'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import StyledListItem from './StyledListItem'
import StyledListItemButton from './StyledListItemButton'
import LayersIcon from '@mui/icons-material/Layers'
import { groupTabs } from '../../../common/libs/tabGroup'
import { getGroupMode } from '../../../common/libs/groupMode'
import { getAllSavedTabGroup } from '../../../common/libs/savedTabGroup'
import { savedTabGroupState } from '../../../common/recoil/atoms/savedTabGroupAtom'
import { useSetRecoilState } from 'recoil'
import type { SavedTabGroupInfo } from '../../../common/types/savedTabGroupInfo'

interface Props {
    updateCurrentTabGroupList: Function
}

export default function GroupCurrentTabs(props: Props): JSX.Element {
    const setSavedTabGroups = useSetRecoilState(savedTabGroupState)

    /*
     * タブをグループ化
     */
    const handleClick = (): void => {
        void getGroupMode().then((groupMode) => {
            groupTabs(groupMode)
                .then(() => {
                    props.updateCurrentTabGroupList()
                    updateSavedTabGroupList()
                })
                .catch((error) => {
                    console.log(error)
                })
        })
    }

    const updateSavedTabGroupList = (): void => {
        void getAllSavedTabGroup().then((savedTabGroupList: SavedTabGroupInfo[]) => {
            setSavedTabGroups(savedTabGroupList)
        })
    }

    return (
        <StyledListItem>
            <StyledListItemButton onClick={handleClick}>
                <ListItemIcon>
                    <LayersIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Group tabs</ListItemText>
            </StyledListItemButton>
        </StyledListItem>
    )
}
