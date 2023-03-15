import React from 'react'
import CurrentTabGroupList from '../organisms/CurrentTabGroupList'
import GroupingFunctionList from '../../components/organisms/GroupingFunctionList'
import TabPanel from '../atoms/TabPanel/TabPanel'

/*
 * 拡張機能のメニュー
 */
interface Props {
    panelTab: number
    index: number
    updateCurrentTabGroupList: Function
    currentTabGroups: chrome.tabGroups.TabGroup[]
}

export default function CurrentTabGroupPanel(props: Props): JSX.Element {
    return (
        <TabPanel value={props.panelTab} index={props.index}>
            <GroupingFunctionList
                updateCurrentTabGroupList={props.updateCurrentTabGroupList}
            />
            <CurrentTabGroupList
                currentTabGroups={props.currentTabGroups}
                updateCurrentTabGroupList={props.updateCurrentTabGroupList}
            />
        </TabPanel>
    )
}
