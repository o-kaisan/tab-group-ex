import React from 'react'
import SettingList from '../organisms/SettingList'
import TabPanel from '../atoms/TabPanel/TabPanel'

interface Props {
    panelTab: number
    index: number
}

export default function SettingsPanel(props: Props): JSX.Element {
    return (
        <TabPanel value={props.panelTab} index={props.index}>
            <SettingList />
        </TabPanel>
    )
}
