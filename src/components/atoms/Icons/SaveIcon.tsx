import React from 'react'
import SaveAltIcon from '@mui/icons-material/SaveAlt'
import { IconButton } from '@mui/material'

interface Props {
    onClick: Function
}

export default function SaveIcon(props: Props): JSX.Element {
    const handleClick = (): void => {
        props.onClick()
    }

    return (
        <IconButton onClick={handleClick}>
            <SaveAltIcon />
        </IconButton>
    )
}
