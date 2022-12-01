import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MainMenu from "../components/MainMenus";
import SettingsList from "../components/SettingsList";
import { getSavedGroupMode, getSavedIgnoreRule, getSavedGroupRule} from '../utils/tabGroupSettings';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export interface GroupRule {
  id : string;
  domain: string;
}

async function getGroupMode(){
    return await getSavedGroupMode()
}

async function getIgnoreRule(){
    return await getSavedIgnoreRule()
}

async function getGroupRule(){
    return await getSavedGroupRule()
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

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
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);
  const [groupMode, setGroupMode] = React.useState()
  // カスタムルール
  const [groupRule, setGroupRule] = React.useState<GroupRule[]>([]);
  // ルール外をグループ化する設定
  const [ignoreRule, setIgnoreRule] = React.useState();

  React.useEffect(()=> {
    getGroupRule().then((value)=>{
      setGroupRule(value)
    })
}, [])
  React.useEffect(()=> {
      getIgnoreRule().then((value)=>{
        setIgnoreRule(value)
      })
  },[])
  React.useEffect(()=>{
      getGroupMode().then((value)=>{
        setGroupMode(value)
      })
  },[])

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Tab Group EX" {...a11yProps(0)} />
          <Tab label="Settings" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <MainMenu
          groupMode={groupMode}
          ignoreRule={ignoreRule}
          groupRule={groupRule}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
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
  );
}
