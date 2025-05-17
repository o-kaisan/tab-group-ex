import React from 'react'
import StyledListItem from './StyledListItem'
import CurrentTabGroupOption from './CurrentTabGroupOption'
import { saveTabGroup, getAllSavedTabGroup } from '../../../common/libs/savedTabGroup'
import SaveIcon from '../../atoms/Icons/SaveIcon'
import { savedTabGroupState } from '../../../common/recoil/atoms/savedTabGroupAtom'
import { useSetRecoilState } from 'recoil'
import { List, ListItemText } from '@mui/material'
import ListItemButton from '@mui/material/ListItemButton'
import Collapse from '@mui/material/Collapse'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import CurrentTabItem from './CurrentTabItem'
import { getTabsByGroupId } from '../../../common/libs/tab'
import { sendSaveMessageToTab } from '../../../common/libs/message'
import TextTruncator from '../../atoms/TextTruncator/TextTruncator'
import { toggleTabGroupCollapsed } from '../../../common/libs/tabGroup'

interface Props {
    tabGroup: chrome.tabGroups.TabGroup
    updateCurrentTabGroupList: Function
    isCollapsed: boolean
    setCollapsedIds: Function
}

export default function DisplayCurrentTabGroup(props: Props): JSX.Element {
    // タブグループメニュを管理
    const setSavedTabGroups = useSetRecoilState(savedTabGroupState)
    const [tabs, setTabs] = React.useState<chrome.tabs.Tab[]>([])

    const resolveTitle = (title: string | undefined): string => {
        if (title === undefined) {
            title = 'none title'
        }
        return title
    }
    const _title = resolveTitle(props.tabGroup.title)

    getTabsByGroupId(props.tabGroup.id)
        .then((tabs: chrome.tabs.Tab[]) => {
            setTabs(tabs)
        })
        .catch((error) => {
            console.log(error)
            return [] as chrome.tabs.Tab[]
        })

    const handleSaveIconClick = (tabGroupTitle: string, tabGroupId: number, color: string): void => {
        void saveTabGroup(tabGroupTitle, tabGroupId, color)
            .then(() => {
                // 表示を更新
                updateSavedTabGroupList()

                // content/content.tsにメッセージを渡す
                sendSaveMessageToTab().catch((e) => { console.log(e) })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)
    const [openUrl, setOpenUrl] = React.useState(false)
    const handleTabGroupItemClick = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>,
        isRight: boolean,
        tabGroupId: number
    ): void => {
        e.preventDefault()
        if (isRight) {
            props.setCollapsedIds((prev: Set<number>) => {
                const newOpenIds = new Set(prev)
                if (newOpenIds.has(tabGroupId)) {
                    newOpenIds.delete(tabGroupId)
                } else {
                    newOpenIds.add(tabGroupId)
                }
                return newOpenIds
            })
            void toggleTabGroupCollapsed(tabGroupId, !props.isCollapsed)
        } else {
            setOpenUrl(!openUrl)
        }
    }

    const updateSavedTabGroupList = (): void => {
        void getAllSavedTabGroup().then((savedTabGroupList) => {
            setSavedTabGroups(savedTabGroupList)
        })
    }

    return (
        <div>
            <StyledListItem groupcolor={props.tabGroup.color}>
                <ListItemButton
                    onClick={(e) => {
                        handleTabGroupItemClick(e, false, props.tabGroup.id)
                    }}
                    onContextMenu={(e) => {
                        handleTabGroupItemClick(e, true, props.tabGroup.id)
                    }}
                    style={{ padding: '3px' }}
                >
                    <ListItemText>
                        <TextTruncator text={_title} maxLength={33} />
                    </ListItemText>
                    {openUrl ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <SaveIcon
                    onClick={() => {
                        handleSaveIconClick(_title, props.tabGroup.id, props.tabGroup.color)
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
                            <CurrentTabItem
                                key={index}
                                tab={url}
                                updateCurrentTabGroupList={props.updateCurrentTabGroupList}
                                updateTabs={getTabsByGroupId}
                                groupId={props.tabGroup.id}
                            />
                        ))
                    ) : (
                        <div></div>
                    )}
                </List>
            </Collapse>
        </div>
    )
}
