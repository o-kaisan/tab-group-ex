import React, { useEffect, useState } from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import CurrentTabGroupPanel from '../templates/CurrentTabGroupPanel'
import SettingsPanel from '../templates/SettingsPanel'
import SavedTabGroupPanel from '../templates/SavedTabGroupPanel'
import GroupRulesPanel from './GroupRulesPanel'
import { v4 as uuidv4 } from 'uuid'
import { getSavedGroupMode } from '../../common/libs/groupMode'
import { getSavedGroupRule } from '../../common/libs/groupRule'
import { getAllTabGroupList } from '../../common/libs/tabGroup'
import { getAllSavedTabGroup } from '../../common/libs/savedTabGroup'
import { GROUP_MODE } from '../../common/const/groupMode'
import type { SavedTabGroupInfo } from '../../common/types/savedTabGroupInfo'
import type { GroupRule } from '../../common/types/groupRule'

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
    // グループ化する設定
    const [groupMode, setGroupMode] = React.useState<string>(GROUP_MODE.all)
    // カスタムルール
    const [groupRule, setGroupRule] = React.useState<GroupRule[]>([{ id: uuidv4(), domain: '' }])
    // 保存されたタブグループの一覧
    const [savedTabGroup, setSavedTabGroup] = React.useState<SavedTabGroupInfo[]>([])
    // タブグループの一覧
    const [currentTabGroups, setCurrentTabGroups] = useState<chrome.tabGroups.TabGroup[]>([])

    // 画面表示時にウィンドウのタブグループを読み込む
    useEffect(() => {
        getAllTabGroupList()
            .then((tabGroupList: chrome.tabGroups.TabGroup[]) => {
                setCurrentTabGroups(tabGroupList)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    // 画面表示時にグループ化ルールを読み込む
    useEffect(() => {
        void getSavedGroupRule().then((value: GroupRule[]) => {
            setGroupRule(value)
        })
    }, [])

    // 画面表示時にグループ化設定を取得
    useEffect(() => {
        void getSavedGroupMode().then((value: string) => {
            setGroupMode(value)
        })
    }, [])

    // 画面表示時にストレージに保存されたタブグループを読み込む
    useEffect(() => {
        updateSavedTabGroupList()
    }, [])

    // タブを切り替える
    const handleChange = (_event: React.SyntheticEvent, newTab: number): void => {
        setPanelTab(newTab)
    }

    // ストレージに保存されたタブグループを取得し、表示を最新化する
    const updateSavedTabGroupList = (): void => {
        void getAllSavedTabGroup().then((savedTabGroupList) => {
            setSavedTabGroup(savedTabGroupList)
        })
    }

    // 現在のウィンドウにあるタブグループを取得し、表示を最新化する
    const updateCurrentTabGroupList = (): void => {
        getAllTabGroupList()
            .then((tabGroupList) => {
                setCurrentTabGroups(tabGroupList)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={panelTab} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Groups" {...a11yProps(0)} />
                    <Tab label="Saved" {...a11yProps(1)} />
                    <Tab label="Rules" {...a11yProps(2)} />
                    <Tab label="Settings" {...a11yProps(3)} />
                </Tabs>
            </Box>
            <CurrentTabGroupPanel
                panelTab={panelTab}
                index={0}
                groupMode={groupMode}
                groupRule={groupRule}
                setSavedTabGroup={setSavedTabGroup}
                updateCurrentTabGroupList={updateCurrentTabGroupList}
                updateSavedTabGroupList={updateSavedTabGroupList}
                currentTabGroups={currentTabGroups}
            />
            <SavedTabGroupPanel
                panelTab={panelTab}
                index={1}
                savedTabGroup={savedTabGroup}
                updateSavedTabGroupList={updateSavedTabGroupList}
                updateCurrentTabGroupList={updateCurrentTabGroupList}
            />
            <GroupRulesPanel
                panelTab={panelTab}
                index={2}
                groupMode={groupMode}
                setGroupMode={setGroupMode}
                groupRule={groupRule}
                setGroupRule={setGroupRule}
            />
            <SettingsPanel
                panelTab={panelTab}
                index={3}
                groupMode={groupMode}
                setGroupMode={setGroupMode}
                groupRule={groupRule}
                setGroupRule={setGroupRule}
            />
        </Box>
    )
}
