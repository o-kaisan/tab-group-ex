import React from 'react'
import List from '@mui/material/List'
import { ListSubheader } from '@mui/material'
import CurrentTabGroupItem from '../../components/molecules/CurrentTabGroupItem/CurrentTabGroupItem'
import NoListItem from '../molecules/NoListItem/NoListItem'

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
            <ListSubheader>Current TabGroups</ListSubheader>
            {props.currentTabGroups.length > 0 ? (
                props.currentTabGroups.map((tabGroup) => (
                    <CurrentTabGroupItem
                        key={tabGroup.id}
                        tabGroupId={tabGroup.id}
                        collapsed={tabGroup.collapsed}
                        tabGroupTitle={tabGroup.title}
                        updateCurrentTabGroupList={props.updateCurrentTabGroupList}
                    />
                ))
            ) : (
                <NoListItem />
            )}
        </List>
    )
}
