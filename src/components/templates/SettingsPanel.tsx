import React from 'react'
import SettingList from '../organisms/SettingList'
import TabPanel from '../atoms/TabPanel/TabPanel'

interface Props {
    panelTab: number
    index: number
    autoGrouping: boolean
    setAutoGrouping: React.Dispatch<React.SetStateAction<boolean>>
}

export default function SettingsPanel(props: Props): JSX.Element {
    return (
        <TabPanel value={props.panelTab} index={props.index}>
            <SettingList
                autoGrouping={props.autoGrouping}
                setAutoGrouping={props.setAutoGrouping}
            />
        </TabPanel>
    )
}
