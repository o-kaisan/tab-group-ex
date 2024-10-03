import React from 'react'
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import type { Url } from '../../../common/types/savedTabGroupInfo';

interface Props {
    url: Url
}

export default function SavedUrlItem(props: Props): JSX.Element {

    return (
        <ListItemButton sx={{ pl: 4 }}>
            <img style={{margin: '0 0.5rem 0 0', width: '1.2rem'}} src={props.url.favIconUrl} alt={props.url.favIconUrl}/>
            <ListItemText primary={props.url.title} />
        </ListItemButton>
    )
}