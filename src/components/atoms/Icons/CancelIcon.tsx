import React from 'react'
import ClearIcon from '@mui/icons-material/Clear'
import { IconButton } from '@mui/material'

interface Props {
    onClick: Function
}

export default function CancelIcon(props: Props): JSX.Element {
    const handleClick = (): void => {
        props.onClick()
    }

    return (
        <IconButton onClick={handleClick}>
            <ClearIcon fontSize="small" />
        </IconButton>
    )
}
