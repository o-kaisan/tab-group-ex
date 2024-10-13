import React from 'react'
import DisplayCurrentTabGroup from './DisplayCurrentTabGroup'


interface Props {
    tabGroup: chrome.tabGroups.TabGroup
    updateCurrentTabGroupList: Function
}

export default function CurrentTabGroupItem(props: Props): JSX.Element {

    return (
        <DisplayCurrentTabGroup
            tabGroup={props.tabGroup}
            updateCurrentTabGroupList={props.updateCurrentTabGroupList}
        />
    )
}
