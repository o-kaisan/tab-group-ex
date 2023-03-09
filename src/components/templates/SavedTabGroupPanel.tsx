import React from 'react'
import SavedTabGroupList from '../../components/organisms/SavedTabGroupList'
import type { SavedTabGroupInfo } from '../../common/types/savedTabGroupInfo'
import TabPanel from '../atoms/TabPanel/TabPanel'

interface Props {
    panelTab: number
    index: number
    savedTabGroup: SavedTabGroupInfo[]
    updateSavedTabGroupList: Function
    updateCurrentTabGroupList: Function
}

export default function SavedTabGroupPanel(props: Props): JSX.Element {
    return (
        <TabPanel value={props.panelTab} index={props.index}>
            <SavedTabGroupList
                savedTabGroup={props.savedTabGroup}
                updateSavedTabGroupList={props.updateSavedTabGroupList}
                updateCurrentTabGroupList={props.updateCurrentTabGroupList}
            />
        </TabPanel>
    )
}
