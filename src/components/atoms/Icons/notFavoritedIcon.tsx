import React from 'react'
import { IconButton } from '@mui/material'
import GradeIcon from '@mui/icons-material/Grade';
import StarOutlineIcon from '@mui/icons-material/StarOutline';



interface Props {
    onClick: Function
}

export default function NotFavoritedIcon(props: Props): JSX.Element {
    const handleClick = (): void => {
        props.onClick()
    }

    return (
        <IconButton onClick={handleClick}>
            <StarOutlineIcon fontSize="small" />
        </IconButton>
    )
}
