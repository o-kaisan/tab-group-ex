import React from 'react'
import TabGroupActionList from '../organisms/TabGroupActionList'
import TabPanel from '../atoms/TabPanel/TabPanel'

interface Props {
    panelTab: number
    index: number
    updateCurrentTabGroupList: () => void
    updateSavedTabGroupList: () => void
}

export default function ActionPanel(props: Props): JSX.Element {
    return (
        <TabPanel value={props.panelTab} index={props.index}>
            <TabGroupActionList updateCurrentTabGroupList={props.updateCurrentTabGroupList} updateSavedTabGroupList={props.updateSavedTabGroupList} />
        </TabPanel>
    )
}
