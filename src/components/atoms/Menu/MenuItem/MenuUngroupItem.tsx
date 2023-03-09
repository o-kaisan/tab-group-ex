import React from 'react'
import MenuItem from '@mui/material/MenuItem'
import LayersClearIcon from '@mui/icons-material/LayersClear'

interface Props {
    onClick: Function
}

export default function MenuUngroupItem(props: Props): JSX.Element {
    const handleClick = (): void => {
        props.onClick()
    }

    return (
        <MenuItem onClick={handleClick} disableRipple>
            <LayersClearIcon />
            Ungroup
        </MenuItem>
    )
}
