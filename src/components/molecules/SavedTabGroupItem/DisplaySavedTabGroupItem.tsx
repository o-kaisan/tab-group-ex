import React from 'react'
import { restoreTabGroup, deleteTabGroup } from '../../../common/libs/savedTabGroup'
import { ListItem, ListItemButton, ListItemText } from '@mui/material'
import SavedTabGroupOption from './SavedTabGroupOption'
import DeleteIcon from '../../atoms/Icons/DeleteIcon'

interface Props {
    tabGroupId: number
    tabGroupTitle: string
    urlList: string[]
    setEditMode: React.Dispatch<React.SetStateAction<boolean>>
    updateSavedTabGroupList: Function
    updateCurrentTabGroupList: Function
}

export default function DisplaySavedTabGroupItem(props: Props): JSX.Element {
    // タブグループメニュを管理
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)

    const handleTabGroupItemClick = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>,
        isRight: boolean,
        tabGroupTitle: string,
        urlList: string[]
    ): void => {
        e.preventDefault()
        if (isRight) {
            setAnchorEl(e.currentTarget)
        } else {
            void restoreTabGroup(tabGroupTitle, urlList).then(() => {
                props.updateCurrentTabGroupList()
            })
        }
    }

    const handleDeleteIconClick = (tabGroupTitle: string, tabGroupId: number): void => {
        void deleteTabGroup(tabGroupTitle, tabGroupId).then(() => props.updateSavedTabGroupList())
    }

    return (
        <ListItem>
            <ListItemButton
                sx={{ pl: 4 }}
                onClick={(e) => {
                    handleTabGroupItemClick(e, false, props.tabGroupTitle, props.urlList)
                }}
                onContextMenu={(e) => {
                    handleTabGroupItemClick(e, true, props.tabGroupTitle, props.urlList)
                }}
            >
                <ListItemText>{props.tabGroupTitle}</ListItemText>
            </ListItemButton>
            <DeleteIcon
                onClick={() => {
                    handleDeleteIconClick(props.tabGroupTitle, props.tabGroupId)
                }}
            />
            <SavedTabGroupOption
                tabGroupId={props.tabGroupId}
                setEditMode={props.setEditMode}
                open={open}
                anchorEl={anchorEl}
                setAnchorEl={setAnchorEl}
            />
        </ListItem>
    )
}
