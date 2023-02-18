import React, { useEffect, useState } from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import MainMenu from '../components/MainMenus'
import SettingsList from '../components/SettingsList'
import {
  getSavedGroupMode,
  getSavedIgnoreRule,
  getSavedGroupRule
} from '../utils/tabGroupSettings'
import {
  getAllTabGroupList,
  getAllSavedTabGroup,
  type SavedTabGroupInfo
  , DEFAULT_MODE
} from '../utils/tabGroups'
import SavedTabGroupList from './SavedTabGroupList'
import { v4 as uuidv4 } from 'uuid'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

export interface GroupRule {
  id: string
  domain: string
}

async function getGroupMode () {
  return await getSavedGroupMode()
}

async function getIgnoreRule () {
  return await getSavedIgnoreRule()
}

async function getGroupRule () {
  return await getSavedGroupRule()
}

function TabPanel (props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 1 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

function a11yProps (index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

export default function BasicTabs () {
  // TODO: 変数名を変更する -> 何を指すかわからない
  const [value, setValue] = React.useState(0)
  const [groupMode, setGroupMode] = React.useState<string>(DEFAULT_MODE)
  // カスタムルール
  const [groupRule, setGroupRule] = React.useState<GroupRule[]>([
    {
      id: uuidv4(),
      domain: ''
    }
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

  useEffect(() => {
    //
    getAllTabGroupList()
      .then((tabGroupList: chrome.tabGroups.TabGroup[]) => {
        setActiveTabGroup(tabGroupList)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  useEffect(() => {
    getGroupRule().then((value: GroupRule[]) => {
      setGroupRule(value)
    })
  }, [])
  useEffect(() => {
    getIgnoreRule().then((value: boolean) => {
      setIgnoreRule(value)
    })
  }, [])
  useEffect(() => {
    getGroupMode().then((value: string) => {
      setGroupMode(value)
    })
  }, [])

  useEffect(() => {
    getSavedTabGroupList()
  }, [])

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const getSavedTabGroupList = () => {
    /*
     * savedTabGroupを取得して更新する
     */
    getAllSavedTabGroup().then((savedTabGroupList) => {
      setSavedTabGroup(savedTabGroupList)
    })
  }

  const updatedTabGroupList = async () => {
    getAllTabGroupList()
      .then((tabGroupList) => {
        setActiveTabGroup(tabGroupList)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Tab Group EX" {...a11yProps(0)} />
          <Tab label="Saved" {...a11yProps(1)} />
          <Tab label="Settings" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <MainMenu
          groupMode={groupMode}
          ignoreRule={ignoreRule}
          groupRule={groupRule}
          setSavedTabGroup={setSavedTabGroup}
          updatedTabGroupList={updatedTabGroupList}
          getSavedTabGroupList={getSavedTabGroupList}
          activeTabGroup={activeTabGroup}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <SavedTabGroupList
          savedTabGroup={savedTabGroup}
          getSavedTabGroupList={getSavedTabGroupList}
          updatedTabGroupList={updatedTabGroupList}
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <SettingsList
          groupMode={groupMode}
          setGroupMode={setGroupMode}
          ignoreRule={ignoreRule}
          setIgnoreRule={setIgnoreRule}
          groupRule={groupRule}
          setGroupRule={setGroupRule}
        />
      </TabPanel>
    </Box>
  )
}
