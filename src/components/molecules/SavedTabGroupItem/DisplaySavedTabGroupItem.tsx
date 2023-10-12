import React from 'react'
import { restoreTabGroup, deleteTabGroup } from '../../../common/libs/savedTabGroup'
import { ListItem, ListItemButton, ListItemText } from '@mui/material'
import SavedTabGroupOption from './SavedTabGroupOption'
import DeleteIcon from '../../atoms/Icons/DeleteIcon'
import { getAllTabGroupList } from '../../../common/libs/tabGroup'
import { currentTabGroupState } from '../../../common/recoil/atoms/currentTabGroupAtom'
import { useSetRecoilState } from 'recoil'

interface Props {
    tabGroupId: number
    tabGroupTitle: string
    urlList: string[]
    setEditMode: React.Dispatch<React.SetStateAction<boolean>>
    updateSavedTabGroupList: Function
}

export default function DisplaySavedTabGroupItem(props: Props): JSX.Element {
    // タブグループメニュを管理
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const setCurrentTabGroups = useSetRecoilState(currentTabGroupState)
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
            void restoreTabGroup(tabGroupTitle, urlList)
                .then(
                    () => {
                        updateCurrentTabGroupList()
                    }
                )
                .catch((error) => {
                    console.log(error)
                })
        }
    }

    const handleDeleteIconClick = (tabGroupTitle: string, tabGroupId: number): void => {
        void deleteTabGroup(tabGroupTitle, tabGroupId).then(() => props.updateSavedTabGroupList())
    }

    // 現在のウィンドウにあるタブグループを取得し、表示を最新化する
    const updateCurrentTabGroupList = (): void => {
        getAllTabGroupList()
            .then((tabGroupList) => {
                setCurrentTabGroups(tabGroupList)
            })
            .catch((error) => {
                console.log(error)
            })
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
