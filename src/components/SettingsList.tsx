import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Switch from '@mui/material/Switch';
import BluetoothIcon from '@mui/icons-material/Bluetooth';
import SelectTabGroupMode from "./SelectTabGroupMode"
import SettingsIcon from '@mui/icons-material/Settings';
import { getSavedIgnoreRule, saveGroupRule, saveIgnoreRule } from '../utils/tabGroupSettings';
import { check } from 'prettier';
import Divider from '@mui/material/Divider';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import { formHelperTextClasses, Input } from "@mui/material";
import Button from '@mui/material/Button';
import {v4 as uuidv4} from "uuid"
import { GroupRule } from './TabPanel';

export interface Props {
  groupMode: any
  setGroupMode: any
  ignoreRule: any
  setIgnoreRule: any
  groupRule: GroupRule[]
  setGroupRule: any
}

export default function SettingsList(props: Props) {
  const [checked, setChecked] = React.useState(props.ignoreRule);

  const handleToggle = async () => {
    setChecked(!checked);
    props.setIgnoreRule(!checked);
    await saveIgnoreRule(!checked)
  };

  // グループ化するドメインのルールを追加する
  const handleAddDomain = () => {
    let _groupRule = [...props.groupRule]
    _groupRule.push({
      id: uuidv4(),
      domain: "",
    })
    props.setGroupRule(_groupRule)
  }

  // グループ化するドメインのルールを削除する
  const handleDeleteDomain = async (id: string) => {
    const _groupRule = [...props.groupRule]
    const removeGroupRule = _groupRule.filter(rule=>rule.id!==id)
    props.setGroupRule(removeGroupRule);
  }

  const handleChangeDomain = async (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, id: string) => {
    const index = props.groupRule.findIndex((rule) => rule.id === id)
    let _groupRule = [...props.groupRule]
    _groupRule[index].domain = event.target.value;
    props.setGroupRule(_groupRule);
  }

  const handleSaveGroupRule = async () => {
    const _groupRule = [...props.groupRule];
    await saveGroupRule(_groupRule);
  }

  return (
    <List
      sx={{ width: '100%', minWidth: 340, bgcolor: 'background.paper' }}
    >
      <ListItem>
        <ListItemText id="list-label-Mode" primary="GroupMode" />
        <SelectTabGroupMode
          groupMode={props.groupMode}
          setGroupMode={props.setGroupMode}
        />
      </ListItem>
      { props.groupMode == "Custom" &&
        <div>
          <Divider />
          <ListItem>
            <ListItemText id="switch-list-label-ignoreRule" primary="ルール以外をまとめてグループ化" />
            <Switch
              edge="end"
              onChange={handleToggle}
              checked={checked}
            />
          </ListItem>
          <Divider />
          <ListSubheader>Group By Domain</ListSubheader>
          {props.groupRule.map((rule: GroupRule) => (
            <ListItem>
              <Input defaultValue={rule.domain} onChange={(e) => handleChangeDomain(e, rule.id)}></Input>
              <IconButton onClick={(e) => handleDeleteDomain(rule.id)}>
                <ClearIcon/>
              </IconButton>
            </ListItem>
          ))}
          <ListItem>
            <Button sx={{m:1}} variant="outlined" size="small"  onClick={handleAddDomain}>Add Group Rule</Button>
            <Button sx={{m:1}} variant="outlined" size="small" color="success" onClick={handleSaveGroupRule}>Save</Button>
          </ListItem>
        </div>
      }
    </List>
  );
}
