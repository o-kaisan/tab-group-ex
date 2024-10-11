import React from 'react'
import DeleteIcon from '../../atoms/Icons/DeleteIcon'
import RestoreIconX from '../../atoms/Icons/RestoreIcon'
import StyledListItem from './StyledListItem'
import SavedUrlItem from './SavedUrlItem'
import { restoreTabGroup, deleteTabGroup } from '../../../common/libs/savedTabGroup'
import { Collapse, List, ListItemButton, ListItemText } from '@mui/material'
import { getAllTabGroupList } from '../../../common/libs/tabGroup'
import { currentTabGroupState } from '../../../common/recoil/atoms/currentTabGroupAtom'
import { useSetRecoilState } from 'recoil'
import { ExpandLess, ExpandMore } from '@mui/icons-material'
import type { SavedTabGroupInfo, Url } from '../../../common/types/savedTabGroupInfo'

interface Props {
    savedTabGroup: SavedTabGroupInfo
    updateSavedTabGroupList: Function
}

export default function DisplaySavedTabGroupItem(props: Props): JSX.Element {

    const resolveUrls = (urls: Url[]): Url[] => {
        if (urls === undefined) {
            return []
        }
        return urls
    }
    const _urls = resolveUrls(props.savedTabGroup.urls)

    // タブグループメニュを管理
    const setCurrentTabGroups = useSetRecoilState(currentTabGroupState)

    const handleTabGroupItemClick = (
        tabGroupTitle: string,
        urls: Url[]
    ): void => {
        void restoreTabGroup(tabGroupTitle, urls)
            .then(
                () => {
                    updateCurrentTabGroupList()
                }
            )
            .catch((error) => {
                console.log(error)
            })
    }

    const [openUrl, setOpenUrl] = React.useState(false);
    const handleClick = (): void => {
        setOpenUrl(!openUrl);
    };

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
        <div>
            <StyledListItem>
                <ListItemButton onClick={handleClick}>
                    <ListItemText>{props.savedTabGroup.title}</ListItemText>
                    {openUrl ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <RestoreIconX 
                    onClick={() => {
                        handleTabGroupItemClick(props.savedTabGroup.title, props.savedTabGroup.urls)
                    }} 
                />
                <DeleteIcon
                    onClick={() => {
                        handleDeleteIconClick(props.savedTabGroup.title, props.savedTabGroup.tabGroupId)
                    }}
                />
            </StyledListItem>
            <Collapse in={openUrl} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {_urls.map((url: Url, index: number) => (<SavedUrlItem key={index} url={url} />))}
                </List>
            </Collapse>
        </div>
    )
}
