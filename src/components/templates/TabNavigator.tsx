import React, { useEffect, useState } from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import { v4 as uuidv4 } from 'uuid'
import ActiveTabGroupPanel from '../templates/ActiveTabGroupPanel'
import SettingsPanel from '../templates/SettingsPanel'
import SavedTabGroupPanel from '../templates/SavedTabGroupPanel'
import {
  getSavedGroupMode,
  getSavedIgnoreRule,
  getSavedGroupRule
} from '../../common/utils/tabGroupSettings'
import {
  getAllTabGroupList,
  getAllSavedTabGroup
} from '../../common/utils/tabGroups'
import { GROUP_MODE } from '../../common/const/groupMode'
import type { SavedTabGroupInfo } from '../../common/types/SavedTabGroupInfo'
import type { GroupRule } from '../../common/types/groupRule'
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
  const [tab, setTab] = React.useState(0)
  // グループ化する設定
  const [groupMode, setGroupMode] = React.useState<string>(GROUP_MODE.DEFAULT)
  // カスタムルール
  const [groupRule, setGroupRule] = React.useState<GroupRule[]>([
    { id: uuidv4(), domain: '' }
  ])
  // ルール外をグループ化する設定
  const [ignoreRule, setIgnoreRule] = React.useState<boolean>(false)
  // 保存されたタブグループの一覧
  const [savedTabGroup, setSavedTabGroup] = React.useState<SavedTabGroupInfo[]>(
    []
  )
  // タブグループの一覧
  const [activeTabGroup, setActiveTabGroup] = useState<
    chrome.tabGroups.TabGroup[]
  >([])

  // 画面表示時にウィンドウのタブグループを読み込む
  useEffect(() => {
    getAllTabGroupList()
      .then((tabGroupList: chrome.tabGroups.TabGroup[]) => {
        setActiveTabGroup(tabGroupList)
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

  // 画面表示時にグループ化ルール以外をグループ化するかの設定を読み込む
  useEffect(() => {
    void getSavedIgnoreRule().then((value: boolean) => {
      setIgnoreRule(value)
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
    getSavedTabGroupList()
  }, [])

  // タブを切り替える
  const handleChange = (_event: React.SyntheticEvent, newTab: number): void => {
    setTab(newTab)
  }

  // ストレージに保存されたタブグループを取得
  const getSavedTabGroupList = (): void => {
    void getAllSavedTabGroup().then((savedTabGroupList) => {
      setSavedTabGroup(savedTabGroupList)
    })
  }

  // タブグループを最新化
  const updatedTabGroupList = (): void => {
    getAllTabGroupList()
      .then((tabGroupList) => {
        setActiveTabGroup(tabGroupList)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    // TODO タブのサイズ
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={tab}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Groups" {...a11yProps(0)} />
          <Tab label="Saved" {...a11yProps(1)} />
          <Tab label="Rules" {...a11yProps(2)} />
          <Tab label="Settings" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <ActiveTabGroupPanel
        tab={tab}
        index={0}
        groupMode={groupMode}
        ignoreRule={ignoreRule}
        groupRule={groupRule}
        setSavedTabGroup={setSavedTabGroup}
        updatedTabGroupList={updatedTabGroupList}
        getSavedTabGroupList={getSavedTabGroupList}
        activeTabGroup={activeTabGroup}
      />
      <SavedTabGroupPanel
        tab={tab}
        index={1}
        savedTabGroup={savedTabGroup}
        getSavedTabGroupList={getSavedTabGroupList}
        updatedTabGroupList={updatedTabGroupList}
      />
      <GroupRulesPanel
        tab={tab}
        index={2}
        groupMode={groupMode}
        setGroupMode={setGroupMode}
        ignoreRule={ignoreRule}
        setIgnoreRule={setIgnoreRule}
        groupRule={groupRule}
        setGroupRule={setGroupRule}
      />
      <SettingsPanel
        tab={tab}
        index={3}
        groupMode={groupMode}
        setGroupMode={setGroupMode}
        ignoreRule={ignoreRule}
        setIgnoreRule={setIgnoreRule}
        groupRule={groupRule}
        setGroupRule={setGroupRule}
      />
    </Box>
  )
}
