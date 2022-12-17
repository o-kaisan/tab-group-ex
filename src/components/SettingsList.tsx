import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Switch from '@mui/material/Switch';
import SelectTabGroupMode from "./SelectTabGroupMode"
import { saveGroupRule, saveIgnoreRule } from '../utils/tabGroupSettings';
import Divider from '@mui/material/Divider';
import ClearIcon from '@mui/icons-material/Clear';
import { Input } from "@mui/material";
import Button from '@mui/material/Button';
import {v4 as uuidv4} from "uuid"
import { GroupRule } from './TabPanel';

interface Props {
  groupMode: string | undefined
  setGroupMode: React.Dispatch<React.SetStateAction<string | undefined>>
  ignoreRule: boolean | undefined
  setIgnoreRule: React.Dispatch<React.SetStateAction<boolean | undefined>>
  groupRule: GroupRule[]
  setGroupRule: React.Dispatch<React.SetStateAction<GroupRule[]>>
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
      domain: "",
      id: uuidv4(),
    })
    props.setGroupRule(_groupRule)
  }

  // グループ化するドメインのルールを削除する
  const handleDeleteDomain = (id: string) => {
    const _groupRule = [...props.groupRule]
    const removeGroupRule = _groupRule.filter(rule=>rule.id!==id)
    props.setGroupRule(removeGroupRule);
  }

  const handleChangeDomain = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, id: string) => {
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
      <ListSubheader>Settings</ListSubheader>
      <ListItem>
        <ListItemText id="list-label-Mode" primary="GroupMode" />
        <SelectTabGroupMode
          groupMode={props.groupMode}
          setGroupMode={props.setGroupMode}
        />
      </ListItem>
      { props.groupMode == "Custom" &&
        <div>
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
            <ListItem key={rule.id}>
              <Input defaultValue={rule.domain} onChange={(e) => handleChangeDomain(e, rule.id)}></Input>
              <IconButton onClick={() => handleDeleteDomain(rule.id)}>
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
