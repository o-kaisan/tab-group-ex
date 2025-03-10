import React from 'react'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { IconButton } from '@mui/material'

interface Props {
    onClick: Function
}

export default function DeleteIcon(props: Props): JSX.Element {
    const handleClick = (): void => {
        props.onClick()
    }

    return (
        <IconButton onClick={handleClick}>
            <DeleteForeverIcon fontSize="small" />
        </IconButton>
    )
}
