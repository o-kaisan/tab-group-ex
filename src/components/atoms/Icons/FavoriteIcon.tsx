import React from 'react'
import { IconButton } from '@mui/material'
import GradeIcon from '@mui/icons-material/Grade';


interface Props {
    onClick: Function
}

export default function FavoriteIcon(props: Props): JSX.Element {
    const handleClick = (): void => {
        props.onClick()
    }

    return (
        <IconButton onClick={handleClick}>
            <GradeIcon fontSize="small" />
        </IconButton>
    )
}
