import React from 'react'
import MenuItem from '@mui/material/MenuItem'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'

interface Props {
    onClick: Function
}

export default function MenuCloseItem(props: Props): JSX.Element {
    const handleClick = (): void => {
        props.onClick()
    }

    return (
        <MenuItem onClick={handleClick} disableRipple>
            <HighlightOffIcon />
            Close
        </MenuItem>
    )
}
