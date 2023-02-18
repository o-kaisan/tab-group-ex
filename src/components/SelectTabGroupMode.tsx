import * as React from 'react'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { type SelectChangeEvent } from '@mui/material/Select'
import { saveGroupMode } from '../utils/tabGroupSettings'
import { CUSTOM_MODE, DEFAULT_MODE, DOMAIN_MODE } from '../utils/tabGroups'

interface Props {
  groupMode: string
  setGroupMode: React.Dispatch<React.SetStateAction<string>>
}

export default function SelectTabGroupMode (props: Props) {
  const handleChange = (event: SelectChangeEvent) => {
    saveGroupMode(event.target.value).then(() => {
      props.setGroupMode(event.target.value)
    })
  }

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
          <MenuItem value={DEFAULT_MODE}>Default</MenuItem>
          <MenuItem value={DOMAIN_MODE}>Domain</MenuItem>
          <MenuItem value={CUSTOM_MODE}>Custom</MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}
