import React from 'react'
import { IconButton } from '@mui/material'
import StarOutlineIcon from '@mui/icons-material/StarOutline';

interface Props {
    onClick: Function
}

export default function NotFavoriteIcon(props: Props): JSX.Element {
    const handleClick = (): void => {
        props.onClick()
    }

    return (
        <IconButton onClick={handleClick}>
            <StarOutlineIcon fontSize="small" />
        </IconButton>
    )
}
