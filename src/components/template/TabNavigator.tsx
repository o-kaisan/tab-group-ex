import React, { useEffect } from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import CurrentTabGroupPanel from '../template/CurrentTabGroupPanel'
import SavedTabGroupPanel from '../template/SavedTabGroupPanel'
import GroupRulesPanel from './GroupRulesPanel'
import ActionPanel from './ActionsPanel'
import { useRecoilState } from 'recoil'
import { getAllTabGroupList } from '../../common/libs/tabGroup'
import { getAllSavedTabGroup } from '../../common/libs/savedTabGroup'
import { currentTabGroupState } from '../../common/recoil/atoms/currentTabGroupAtom'
import { savedTabGroupState } from '../../common/recoil/atoms/savedTabGroupAtom'

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
    // 現在のタブグループ
    const [currentTabGroups, setCurrentTabGroups] = useRecoilState(currentTabGroupState)
    // 保存されたタブグループの一覧
    const [savedTabGroups, setSavedTabGroups] = useRecoilState(savedTabGroupState)

    useEffect(() => {
        // 画面表示時にウィンドウのタブグループを読み込む
        getAllTabGroupList()
            .then((tabGroupList: chrome.tabGroups.TabGroup[]) => {
                setCurrentTabGroups(tabGroupList)
            })
            .catch((error) => {
                console.log(error)
            })
        // 画面表示時にストレージに保存されたタブグループを読み込む
        updateSavedTabGroupList()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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

    // ストレージに保存されたタブグループを取得し、表示を最新化する
    const updateSavedTabGroupList = (): void => {
        void getAllSavedTabGroup().then((savedTabGroupList) => {
            setSavedTabGroups(savedTabGroupList)
        })
    }

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
                    <Tab label="Actions" {...a11yProps(2)} />
                    <Tab label="Rules" {...a11yProps(3)} />
                </Tabs>
            </Box>
            <CurrentTabGroupPanel panelTab={panelTab} index={0} currentTabGroups={currentTabGroups} updateCurrentTabGroupList={updateCurrentTabGroupList} />
            <SavedTabGroupPanel panelTab={panelTab} index={1} savedTabGroups={savedTabGroups} updateSavedTabGroupList={updateCurrentTabGroupList} />
            <ActionPanel panelTab={panelTab} index={2} updateCurrentTabGroupList={updateCurrentTabGroupList} updateSavedTabGroupList={updateSavedTabGroupList} />
            <GroupRulesPanel panelTab={panelTab} index={3} />
        </Box>
    )
}
