import React from 'react'
import RestorePageIcon from '@mui/icons-material/RestorePage';
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
            <RestorePageIcon fontSize="small" />
        </IconButton>
    )
}
