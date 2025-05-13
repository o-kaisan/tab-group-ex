import React from 'react'
import TabPanel from '../atoms/TabPanel/TabPanel'
import GroupRulesList from '../organisms/GroupRulesList'

interface Props {
    panelTab: number
    index: number
}

export default function GroupRulesPanel(props: Props): JSX.Element {
    return (
        <TabPanel value={props.panelTab} index={props.index}>
            <GroupRulesList />
        </TabPanel>
    )
}
