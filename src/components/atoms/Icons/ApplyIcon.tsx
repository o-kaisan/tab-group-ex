import React from 'react'
import CheckIcon from '@mui/icons-material/Check'
import { IconButton } from '@mui/material'

interface Props {
    onClick: Function
}

export default function ApplyIcon(props: Props): JSX.Element {
    const handleClick = (): void => {
        props.onClick()
    }

    return (
        <IconButton onClick={handleClick}>
            <CheckIcon />
        </IconButton>
    )
}
