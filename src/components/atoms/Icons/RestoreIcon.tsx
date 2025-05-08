import React from 'react'
import RestoreIcon from '@mui/icons-material/Restore'
import { IconButton } from '@mui/material'

interface Props {
    onClick: Function
}

export default function RestoreIconX(props: Props): JSX.Element {
    const handleClick = (): void => {
        props.onClick()
    }

    return (
        <IconButton onClick={handleClick}>
            <RestoreIcon fontSize="small" />
        </IconButton>
    )
}
