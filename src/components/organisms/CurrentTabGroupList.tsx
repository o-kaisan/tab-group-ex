import React, { useEffect, useState } from 'react'
import List from '@mui/material/List'
import StyledListSubheader from './ListSubheader'
import NoListItem from '../molecules/NoListItem/NoListItem'
import DisplayCurrentTabGroup from '../molecules/CurrentTabGroupItem/DisplayCurrentTabGroup'

interface Props {
    currentTabGroups: chrome.tabGroups.TabGroup[]
    updateCurrentTabGroupList: Function
}

export default function CurrentTabGroupList(props: Props): JSX.Element {
    const [collapsedIds, setCollapsedIds] = useState<Set<number>>(new Set())

    useEffect(() => {
        const newCollapsedIds = new Set<number>()
        props.currentTabGroups.forEach((tabGroup) => {
            if (tabGroup.collapsed) {
                newCollapsedIds.add(tabGroup.id)
            }
        })
        setCollapsedIds(newCollapsedIds)
    }, [props.currentTabGroups])

    return (
        <List>
            <StyledListSubheader>Current TabGroups</StyledListSubheader>
            {props.currentTabGroups.length > 0 ? (
                props.currentTabGroups.map((tabGroup) => (
                    <DisplayCurrentTabGroup
                        key={tabGroup.id}
                        tabGroup={tabGroup}
                        isCollapsed={collapsedIds.has(tabGroup.id)}
                        setCollapsedIds={setCollapsedIds}
                        updateCurrentTabGroupList={props.updateCurrentTabGroupList}
                    />
                ))
            ) : (
                <NoListItem />
            )}
        </List>
    )
}
