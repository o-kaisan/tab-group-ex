import React, { type ReactNode } from 'react'
import ListItemText from '@mui/material/ListItemText'
import StyledListItem from './StyledListItem'
import StyledListItemButton from './StyledListItemButton'
import { groupTabs } from '../../../common/libs/tabGroup'
import { getAllSavedTabGroup } from '../../../common/libs/savedTabGroup'
import { savedTabGroupState } from '../../../common/recoil/atoms/savedTabGroupAtom'
import { useSetRecoilState } from 'recoil'
import StyledListItemIcon from './StyledListItemIcon'
import type { GroupModeType } from '../../../common/types/groupMode'
import type { SavedTabGroupInfo } from '../../../common/types/savedTabGroupInfo'


interface Props {
    title: string
    groupMode: GroupModeType
    updateCurrentTabGroupList: () => void
    children: ReactNode
}

export default function GroupCurrentTabs(props: Props): JSX.Element {
    const setSavedTabGroups = useSetRecoilState(savedTabGroupState)

    /*
     * タブをグループ化
     */
    const handleClick = (): void => {
        groupTabs(props.groupMode)
            .then(() => {
                props.updateCurrentTabGroupList()
                updateSavedTabGroupList()
            })
            .catch((error) => {
                console.log(error)
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
                <StyledListItemIcon>
                    {props.children}
                </StyledListItemIcon>
                <ListItemText>{props.title}</ListItemText>
            </StyledListItemButton>
        </StyledListItem>
    )
}
