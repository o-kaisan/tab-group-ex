import React, { useState } from 'react'
import { List, ListSubheader } from '@mui/material'
import DisplaySavedTabGroupItem from '../molecules/SavedTabGroupItem/DisplaySavedTabGroupItem'
import NoListItem from '../molecules/NoListItem/NoListItem'
import type { SavedTabGroupInfo } from '../../common/types/savedTabGroupInfo'
import { closestCenter, DndContext } from '@dnd-kit/core'
import { arrayMove, SortableContext } from '@dnd-kit/sortable'
import { restrictToVerticalAxis, restrictToWindowEdges } from '@dnd-kit/modifiers'
import { updateSavedTabGroups } from '../../common/libs/savedTabGroup'
import { savedTabGroupState } from '../../common/recoil/atoms/savedTabGroupAtom'
import { useSetRecoilState } from 'recoil'

interface Props {
    savedTabGroups: SavedTabGroupInfo[]
    updateSavedTabGroupList: Function
}

export default function SavedTabGroupList(props: Props): JSX.Element {
    const setSavedTabGroups = useSetRecoilState(savedTabGroupState)
    const [openIds, setOpenIds] = useState<Set<string>>(new Set())
    const resolveSavedTabGroups = (tabGroups: SavedTabGroupInfo[]): SavedTabGroupInfo[] => {
        if (tabGroups === undefined) {
            return []
        }
        return tabGroups
    }
    const _savedTabGroups = resolveSavedTabGroups(props.savedTabGroups)

    const handleOnDndStart = (): void => {
        setOpenIds(new Set())
    }

    const handleOnDndEnd = (event: any): void => {
        const { active, over } = event
        if (over == null || active.id === over.id) {
            return
        }
        const oldIndex = _savedTabGroups.findIndex((savedTabGroupState) => savedTabGroupState.id === active.id)
        const newIndex = _savedTabGroups.findIndex((savedTabGroupState) => savedTabGroupState.id === over.id)
        const newSavedTabGroups = arrayMove(_savedTabGroups, oldIndex, newIndex)
        updateSavedTabGroups(newSavedTabGroups)
            .then()
            .catch((error) => {
                console.log(error)
            })
        setSavedTabGroups(newSavedTabGroups)
    }

    return (
        <List>
            <ListSubheader>Saved TabGroups</ListSubheader>
            <DndContext
                collisionDetection={closestCenter}
                onDragStart={handleOnDndStart}
                onDragEnd={handleOnDndEnd}
                modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
            >
                <SortableContext items={_savedTabGroups}>
                    {_savedTabGroups.length > 0 ? (
                        _savedTabGroups.map((tabGroup) => (
                            <DisplaySavedTabGroupItem
                                key={tabGroup.id}
                                savedTabGroup={tabGroup}
                                updateSavedTabGroupList={props.updateSavedTabGroupList}
                                isOpen={openIds.has(tabGroup.id)}
                                setOpenIds={setOpenIds}
                            />
                        ))
                    ) : (
                        <NoListItem />
                    )}
                </SortableContext>
            </DndContext>
        </List>
    )
}
