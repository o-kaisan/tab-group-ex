import React from 'react'
import List from '@mui/material/List'
import StyledListSubheader from './ListSubheader'
import NoListItem from '../molecules/NoListItem/NoListItem'
import DisplayCurrentTabGroup from '../molecules/CurrentTabGroupItem/DisplayCurrentTabGroup'

interface Props {
    currentTabGroups: chrome.tabGroups.TabGroup[]
    updateCurrentTabGroupList: Function
}

export default function CurrentTabGroupList(props: Props): JSX.Element {
    // TODO リストアしたときにタブグループを更新するように
    // バックグラウンドで変更を確認するのがいいかも
    // 一つ上で状態管理しているため、このパネルに来ても画面再描写されていないと思われる
    return (
        <List>
            <StyledListSubheader>Current TabGroups</StyledListSubheader>
            {props.currentTabGroups.length > 0 ? (
                props.currentTabGroups.map((tabGroup) => (
                    <DisplayCurrentTabGroup
                        key={tabGroup.id}
                        tabGroup={tabGroup}
                        updateCurrentTabGroupList={props.updateCurrentTabGroupList}
                    />
                ))
            ) : (
                <NoListItem />
            )}
        </List>
    )
}
