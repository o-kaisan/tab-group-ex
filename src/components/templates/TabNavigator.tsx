import React from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import CurrentTabGroupPanel from '../templates/CurrentTabGroupPanel'
import SettingsPanel from '../templates/SettingsPanel'
import SavedTabGroupPanel from '../templates/SavedTabGroupPanel'
import GroupRulesPanel from './GroupRulesPanel'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    }
}

export default function TabNavigator(): JSX.Element {
    // 表示するタブを管理
    const [panelTab, setPanelTab] = React.useState(0)

    // タブを切り替える
    const handleChange = (_event: React.SyntheticEvent, newTab: number): void => {
        setPanelTab(newTab)
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={panelTab} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Groups" {...a11yProps(0)} />
                    <Tab label="Saved" {...a11yProps(1)} />
                    <Tab label="Settings" {...a11yProps(2)} />
                    <Tab label="Rules" {...a11yProps(3)} />
                </Tabs>
            </Box>
            <CurrentTabGroupPanel panelTab={panelTab} index={0} />
            <SavedTabGroupPanel panelTab={panelTab} index={1} />
            <SettingsPanel panelTab={panelTab} index={2} />
            <GroupRulesPanel panelTab={panelTab} index={3} />
        </Box>
    )
}
