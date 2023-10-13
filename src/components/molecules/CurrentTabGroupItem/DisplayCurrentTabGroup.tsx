import React from 'react'
import ListItemText from '@mui/material/ListItemText'
import { ListItem, ListItemButton } from '@mui/material'
import { toggleTabGroupCollapsed } from '../../../common/libs/tabGroup'
import CurrentTabGroupOption from './CurrentTabGroupOption'
import { saveTabGroup, getAllSavedTabGroup } from '../../../common/libs/savedTabGroup'
import SaveIcon from '../../atoms/Icons/SaveIcon'
import { savedTabGroupState } from '../../../common/recoil/atoms/savedTabGroupAtom'
import { useSetRecoilState } from 'recoil'

interface Props {
    tabGroupId: number
    collapsed: boolean
    tabGroupTitle: string
    setEditMode: React.Dispatch<React.SetStateAction<boolean>>
    updateCurrentTabGroupList: Function
}

export default function DisplayCurrentTabGroup(props: Props): JSX.Element {
    // タブグループメニュを管理
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const setSavedTabGroups = useSetRecoilState(savedTabGroupState)
    const open = Boolean(anchorEl)

    const handleTabGroupItemClick = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>,
        isRight: boolean,
        tabGroupId: number,
        collapsed: boolean
    ): void => {
        e.preventDefault()
        if (isRight) {
            setAnchorEl(e.currentTarget)
        } else {
            runUpdateTabGroupCollapsed(tabGroupId, collapsed)
        }
    }

    const handleSaveIconClick = (tabGroupTitle: string, tabGroupId: number): void => {
        void saveTabGroup(tabGroupTitle, tabGroupId)
            .then(
                () => {
                    updateSavedTabGroupList()
                }
            )
            .catch((error) => {
                console.log(error)
            })
    }

    const runUpdateTabGroupCollapsed = (tabGroupId: number, collapsed: boolean): void => {
        void toggleTabGroupCollapsed(tabGroupId, !collapsed)
        props.updateCurrentTabGroupList()
    }

    const updateSavedTabGroupList = (): void => {
        void getAllSavedTabGroup().then((savedTabGroupList) => {
            setSavedTabGroups(savedTabGroupList)
        })
    }

    return (
        <ListItem>
            <ListItemButton
                sx={{ pl: 4 }}
                onClick={(e) => {
                    handleTabGroupItemClick(e, false, props.tabGroupId, props.collapsed)
                }}
                onContextMenu={(e) => {
                    handleTabGroupItemClick(e, true, props.tabGroupId, props.collapsed)
                }}
            >
                <ListItemText>{props.tabGroupTitle}</ListItemText>
            </ListItemButton>
            <SaveIcon
                onClick={() => {
                    handleSaveIconClick(props.tabGroupTitle, props.tabGroupId)
                }}
            />
            <CurrentTabGroupOption
                tabGroupId={props.tabGroupId}
                updateCurrentTabGroupList={props.updateCurrentTabGroupList}
                setEditMode={props.setEditMode}
                open={open}
                anchorEl={anchorEl}
                setAnchorEl={setAnchorEl}
            />
        </ListItem>
    )
}
