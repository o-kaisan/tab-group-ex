import React from 'react'
import DeleteIcon from '../../atoms/Icons/DeleteIcon'
import RestoreIconX from '../../atoms/Icons/RestoreIcon'
import TextTruncator from '../../atoms/TextTruncator/TextTruncator'
import StyledListItem from './StyledListItem'
import SavedTabItem from './SavedTabItem'
import DragIndicatorSharpIcon from '@mui/icons-material/DragIndicatorSharp'
import { CSS } from '@dnd-kit/utilities'
import { useSortable } from '@dnd-kit/sortable'
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
    isOpen: boolean
    setOpenIds: Function
}

export default function DisplaySavedTabGroupItem(props: Props): JSX.Element {
    const {
        // 並び替えのつまみ部分に設定するプロパティ
        isDragging,
        setActivatorNodeRef,
        attributes,
        listeners,
        // DOM全体に対して設定するプロパティ
        setNodeRef,
        transform,
        transition
    } = useSortable({ id: props.savedTabGroup.id })

    const resolveUrls = (urls: Url[]): Url[] => {
        if (urls === undefined) {
            return []
        }
        return urls
    }
    const _urls = resolveUrls(props.savedTabGroup.urls)

    // タブグループメニュを管理
    const setCurrentTabGroups = useSetRecoilState(currentTabGroupState)

    const handleTabGroupItemClick = (tabGroupTitle: string, urls: Url[]): void => {
        void restoreTabGroup(tabGroupTitle, urls)
            .then(() => {
                updateCurrentTabGroupList()
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const handleClick = (savedTabGroupId: string): void => {
        props.setOpenIds((prev: Set<string>) => {
            const newOpenIds = new Set(prev)
            if (newOpenIds.has(savedTabGroupId)) {
                newOpenIds.delete(savedTabGroupId)
            } else {
                newOpenIds.add(savedTabGroupId)
            }
            return newOpenIds
        })
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

    const resolveColor = (color: string): string => {
        if (typeof color === 'undefined') {
            return '#dcdcdc'
        }
        return color
    }

    return (
        <div
            ref={setNodeRef}
            style={{
                transform: CSS.Transform.toString(transform),
                transition
            }}
        >
            <StyledListItem groupcolor={resolveColor(props.savedTabGroup.color)}>
                <div
                    ref={setActivatorNodeRef}
                    {...attributes}
                    {...listeners}
                    style={{
                        cursor: isDragging ? 'grabbing' : 'grab',
                        paddingTop: '3px'
                    }}
                >
                    <DragIndicatorSharpIcon style={{ fontSize: '1.3rem' }} />
                </div>
                <ListItemButton
                    style={{ padding: '2px 2px' }}
                    onClick={() => {
                        handleClick(props.savedTabGroup.id)
                    }}
                >
                    <ListItemText>
                        <TextTruncator text={props.savedTabGroup.title} maxLength={33} />
                    </ListItemText>
                    {props.isOpen ? <ExpandLess /> : <ExpandMore />}
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
            <Collapse in={props.isOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {_urls.map((url: Url, index: number) => (
                        <SavedTabItem key={index} url={url} />
                    ))}
                </List>
            </Collapse>
        </div>
    )
}
