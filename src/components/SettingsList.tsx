import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Switch from '@mui/material/Switch';
import BluetoothIcon from '@mui/icons-material/Bluetooth';
import SelectTabGroupMode from "./SelectTabGroupMode"
import SettingsIcon from '@mui/icons-material/Settings';

export interface Props {
  groupMode: any
  setGroupMode: any
}

export default function SettingsList(props: Props) {
  const [checked, setChecked] = React.useState(['none-rule-grouping']);

  const handleToggle = (value: string) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <List
      sx={{ width: '100%', minWidth: 340, bgcolor: 'background.paper' }}
      subheader={<ListSubheader>Settings</ListSubheader>}
    >
      <ListItem>
        <ListItemText id="list-label-Mode" primary="GroupMode" />
        <SelectTabGroupMode
          groupMode={props.groupMode}
          setGroupMode={props.setGroupMode}
        />
      </ListItem>
      { props.groupMode == "dummy" &&
        <ListItem>
          <ListItemText id="switch-list-label-none-rule-grouping" primary="ルールに含まれないものでグループ化(未実装)" />
          <Switch
            edge="end"
            onChange={handleToggle('none-rule-grouping')}
            checked={checked.indexOf('none-rule-grouping') !== -1}
            inputProps={{
              'aria-labelledby': 'switch-list-label-none-rule-grouping',
            }}
          />
        </ListItem>
      }
    </List>
  );
}
