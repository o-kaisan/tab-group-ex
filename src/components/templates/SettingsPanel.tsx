import React from 'react'
import SettingList from '../organisms/SettingList'
import type { GroupRule } from '../../common/types/groupRule'
import TabPanel from '../atoms/TabPanel/TabPanel'
import { SettingsDescription } from '../molecules/SettingItems/SettingsDescription'

interface Props {
    panelTab: number
    index: number
    groupMode: string
    setGroupMode: React.Dispatch<React.SetStateAction<string>>
    groupRule: GroupRule[]
    setGroupRule: React.Dispatch<React.SetStateAction<GroupRule[]>>
}

export default function SettingsPanel(props: Props): JSX.Element {
    return (
        <TabPanel value={props.panelTab} index={props.index}>
            <SettingList
                groupMode={props.groupMode}
                setGroupMode={props.setGroupMode}
                groupRule={props.groupRule}
                setGroupRule={props.setGroupRule}
            />
            <SettingsDescription />
        </TabPanel>
    )
}
