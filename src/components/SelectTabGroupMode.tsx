import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { saveGroupMode } from '../utils/tabGroupSettings';

export interface Props {
  groupMode: any
  setGroupMode: any
}

export default function SelectTabGroupMode(props: Props) {
  // TODO; ストレージからとってくるように

  const handleChange = (event: SelectChangeEvent) => {
    saveGroupMode(event.target.value).then(()=>{
      props.setGroupMode(event.target.value);
    });
  };

  return (
    <div>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={props.groupMode}
          onChange={handleChange}
          label="GroupMode"
        >
          <MenuItem value={"Default"}>Default</MenuItem>
          <MenuItem value={"Domain"}>Domain</MenuItem>
          <MenuItem value={"Custom"}>Custom</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}