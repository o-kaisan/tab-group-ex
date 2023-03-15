import React from 'react'
import SavedTabGroupList from '../../components/organisms/SavedTabGroupList'
import TabPanel from '../atoms/TabPanel/TabPanel'

interface Props {
    panelTab: number
    index: number
    updateCurrentTabGroupList: Function
}

export default function SavedTabGroupPanel(props: Props): JSX.Element {
    return (
        <TabPanel value={props.panelTab} index={props.index}>
            <SavedTabGroupList />
        </TabPanel>
    )
}
