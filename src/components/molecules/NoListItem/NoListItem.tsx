import React from 'react'
import { ListItem } from '@mui/material'
import ListItemText from '@mui/material/ListItemText'

export default function NoListItem(): JSX.Element {
    return (
        <ListItem>
            <ListItemText sx={{ ml: 3 }}>No Item exist</ListItemText>
        </ListItem>
    )
}
