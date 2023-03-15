import React from 'react'
import SettingList from '../organisms/SettingList'
import type { GroupRule } from '../../common/types/groupRule'
import TabPanel from '../atoms/TabPanel/TabPanel'

interface Props {
    panelTab: number
    index: number
    groupRule: GroupRule[]
    setGroupRule: React.Dispatch<React.SetStateAction<GroupRule[]>>
    autoGrouping: boolean
    setAutoGrouping: React.Dispatch<React.SetStateAction<boolean>>
}

export default function SettingsPanel(props: Props): JSX.Element {
    return (
        <TabPanel value={props.panelTab} index={props.index}>
            <SettingList
                groupRule={props.groupRule}
                setGroupRule={props.setGroupRule}
                autoGrouping={props.autoGrouping}
                setAutoGrouping={props.setAutoGrouping}
            />
        </TabPanel>
    )
}
