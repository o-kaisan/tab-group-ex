
import React from 'react'
import SavedTabGroupList from '../../components/organisms/SavedTabGroupList'
import type { SavedTabGroupInfo } from '../../common/types/savedTabGroupInfo'
import TabPanel from '../atoms/TabPanel/TabPanel'

interface Props {
    panelTab: number
    index: number
    savedTabGroups: SavedTabGroupInfo[]
    updateSavedTabGroupList: () => void
}

export default function SavedTabGroupPanel(props: Props): JSX.Element {

    return (
        <TabPanel value={props.panelTab} index={props.index}>
            <SavedTabGroupList
                savedTabGroups={props.savedTabGroups}
                updateSavedTabGroupList={props.updateSavedTabGroupList}
            />
        </TabPanel>
    )
}
