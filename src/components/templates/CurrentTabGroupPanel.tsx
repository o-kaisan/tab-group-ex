import React from 'react'
import CurrentTabGroupList from '../organisms/CurrentTabGroupList'
import GroupingFunctionList from '../../components/organisms/GroupingFunctionList'
import type { GroupRule } from '../../common/types/groupRule'
import type { SavedTabGroupInfo } from '../../common/types/savedTabGroupInfo'
import TabPanel from '../atoms/TabPanel/TabPanel'

/*
 * 拡張機能のメニュー
 */
interface Props {
    panelTab: number
    index: number
    groupRule: GroupRule[]
    setSavedTabGroup: React.Dispatch<React.SetStateAction<SavedTabGroupInfo[]>>
    updateCurrentTabGroupList: Function
    updateSavedTabGroupList: Function
    currentTabGroups: chrome.tabGroups.TabGroup[]
}

export default function CurrentTabGroupPanel(props: Props): JSX.Element {
    return (
        <TabPanel value={props.panelTab} index={props.index}>
            <GroupingFunctionList
                groupRule={props.groupRule}
                setSavedTabGroup={props.setSavedTabGroup}
                updateCurrentTabGroupList={props.updateCurrentTabGroupList}
                updateSavedTabGroupList={props.updateSavedTabGroupList}
            />
            <CurrentTabGroupList
                currentTabGroups={props.currentTabGroups}
                updateSavedTabGroupList={props.updateSavedTabGroupList}
                updateCurrentTabGroupList={props.updateCurrentTabGroupList}
            />
        </TabPanel>
    )
}
