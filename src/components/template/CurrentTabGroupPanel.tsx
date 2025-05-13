import React from 'react'
import CurrentTabGroupList from '../organisms/CurrentTabGroupList'
import TabPanel from '../atoms/TabPanel/TabPanel'
/*
 * 拡張機能のメニュー
 */
interface Props {
    panelTab: number
    index: number
    currentTabGroups: chrome.tabGroups.TabGroup[]
    updateCurrentTabGroupList: () => void
}

export default function CurrentTabGroupPanel(props: Props): JSX.Element {
    // タブグループの一覧

    return (
        <TabPanel value={props.panelTab} index={props.index}>
            <CurrentTabGroupList
                currentTabGroups={props.currentTabGroups}
                updateCurrentTabGroupList={props.updateCurrentTabGroupList}
            />
        </TabPanel>
    )
}
