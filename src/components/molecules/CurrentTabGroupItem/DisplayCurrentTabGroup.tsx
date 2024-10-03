import React from 'react'
import StyledListItem from './StyledListItem'
import CurrentTabGroupOption from './CurrentTabGroupOption'
import { saveTabGroup, getAllSavedTabGroup } from '../../../common/libs/savedTabGroup'
import SaveIcon from '../../atoms/Icons/SaveIcon'
import { savedTabGroupState } from '../../../common/recoil/atoms/savedTabGroupAtom'
import { useSetRecoilState } from 'recoil'
import { List, ListItemText } from '@mui/material';
import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import CurrentUrlItem from './CurrentUrlItem';
import { getTabsByGroupId } from '../../../common/libs/tab';

interface Props {
    tabGroup: chrome.tabGroups.TabGroup    
    updateCurrentTabGroupList: Function
}

export default function DisplayCurrentTabGroup(props: Props): JSX.Element {
    // タブグループメニュを管理
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const setSavedTabGroups = useSetRecoilState(savedTabGroupState)
    const open = Boolean(anchorEl)

    const [openUrl, setOpenUrl] = React.useState(false);
    const handleClick = (): void => {
        setOpenUrl(!openUrl);
    };

    const [tabs, setTabs] = React.useState<chrome.tabs.Tab[]>([])

    const resolveTitle = (title: string | undefined): string => {
        if (title === undefined) {
            title = 'none title'
        }
        return title
    }
    const _title = resolveTitle(props.tabGroup.title)


    // ダミーURLはちゃんと取れるようにする
    getTabsByGroupId(props.tabGroup.id).then((tabs: chrome.tabs.Tab[]) => {
        setTabs(tabs) 
    })
    .catch((error) => {
        console.log(error)
        return  [] as chrome.tabs.Tab[]
    })

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

    const updateSavedTabGroupList = (): void => {
        void getAllSavedTabGroup().then((savedTabGroupList) => {
            setSavedTabGroups(savedTabGroupList)
        })
    }

    return (
        <div>
            <StyledListItem groupcolor={props.tabGroup.color}>
                <ListItemButton onClick={handleClick}>
                    <ListItemText>{_title}</ListItemText>
                    {openUrl ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <SaveIcon
                    onClick={() => {
                        handleSaveIconClick(_title, props.tabGroup.id)
                    }}
                />
                <CurrentTabGroupOption
                    tabGroupId={props.tabGroup.id}
                    updateCurrentTabGroupList={props.updateCurrentTabGroupList}
                    open={open}
                    anchorEl={anchorEl}
                    setAnchorEl={setAnchorEl}
                />
            </StyledListItem>
            <Collapse in={openUrl} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {tabs.length > 0 ? (
                            tabs.map((url: chrome.tabs.Tab, index: number) => (
                                <CurrentUrlItem key={index} tab={url} />
                            ))
                        ) : ( 
                            <div></div>
                        )
                    } 
                </List>
            </Collapse>
        </div>
)
}
