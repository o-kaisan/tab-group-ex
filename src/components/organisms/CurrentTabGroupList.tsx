import React from 'react'
import List from '@mui/material/List'
import { ListSubheader } from '@mui/material'
import CurrentTabGroupItem from '../../components/molecules/CurrentTabGroupItem/CurrentTabGroupItem'
import NoListItem from '../molecules/NoListItem/NoListItem'

interface Props {
    currentTabGroups: chrome.tabGroups.TabGroup[]
    updateSavedTabGroupList: Function
    updateCurrentTabGroupList: Function
}

export default function CurrentTabGroupList(props: Props): JSX.Element {
    return (
        <List>
            <ListSubheader>Current TabGroups</ListSubheader>
            {props.currentTabGroups.length > 0 ? (
                props.currentTabGroups.map((tabGroup) => (
                    <CurrentTabGroupItem
                        key={tabGroup.id}
                        tabGroupId={tabGroup.id}
                        collapsed={tabGroup.collapsed}
                        tabGroupTitle={tabGroup.title}
                        updateSavedTabGroupList={props.updateSavedTabGroupList}
                        updateCurrentTabGroupList={props.updateCurrentTabGroupList}
                    />
                ))
            ) : (
                <NoListItem />
            )}
        </List>
    )
}
