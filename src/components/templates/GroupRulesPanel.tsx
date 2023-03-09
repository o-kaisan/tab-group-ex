import React from 'react'
import TabPanel from '../atoms/TabPanel/TabPanel'
import GroupRulesList from '../organisms/GroupRulesList'
import type { GroupRule } from '../../common/types/groupRule'

interface Props {
    panelTab: number
    index: number
    groupMode: string
    setGroupMode: React.Dispatch<React.SetStateAction<string>>
    groupRule: GroupRule[]
    setGroupRule: React.Dispatch<React.SetStateAction<GroupRule[]>>
}

export default function GroupRulesPanel(props: Props): JSX.Element {
    return (
        <TabPanel value={props.panelTab} index={props.index}>
            <GroupRulesList
                groupMode={props.groupMode}
                setGroupMode={props.setGroupMode}
                groupRule={props.groupRule}
                setGroupRule={props.setGroupRule}
            />
        </TabPanel>
    )
}
