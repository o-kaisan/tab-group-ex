import React from 'react'
import MenuItem from '@mui/material/MenuItem'
import EditIcon from '@mui/icons-material/Edit'

interface Props {
    onClick: Function
}

export default function MenuEditItem(props: Props): JSX.Element {
    const handleClick = (): void => {
        props.onClick()
    }

    return (
        <MenuItem onClick={handleClick} disableRipple>
            <EditIcon />
            Edit
        </MenuItem>
    )
}
