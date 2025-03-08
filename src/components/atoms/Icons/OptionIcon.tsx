import React from 'react'
import { IconButton } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'

interface Props {
    setAnchorEl: Function
    open: boolean
}

export default function OptionIcon(props: Props): JSX.Element {
    const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
        props.setAnchorEl(event.currentTarget)
    }

    return (
        <IconButton
            style={{ padding: '3px' }}
            aria-label="more"
            id="demo-customized-button"
            aria-controls={props.open ? 'long-menu' : undefined}
            aria-expanded={props.open ? 'true' : undefined}
            aria-haspopup="true"
            onClick={handleClick}
        >
            <MoreVertIcon fontSize="small" />
        </IconButton>
    )
}
