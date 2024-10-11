import React from 'react'
import { ListItem } from '@mui/material'
import ListItemText from '@mui/material/ListItemText';
import type { Url } from '../../../common/types/savedTabGroupInfo';
import RestoreIconX from '../../atoms/Icons/RestoreIcon'
import { createTab } from '../../../common/libs/tab';


interface Props {
    url: Url
}

export default function SavedUrlItem(props: Props): JSX.Element {

    const handleUrlClick = (url: Url): void => {
        createTab(url.url).catch((e) => {console.log(e)})
    }

    return (
        <ListItem sx={{ pl: 4 }}>
            <img style={{margin: '0 0.5rem 0 0', width: '1.2rem'}} src={props.url.favIconUrl} alt={props.url.favIconUrl}/>
            <ListItemText primary={props.url.title} />
            <RestoreIconX 
                onClick={() => {
                    handleUrlClick(props.url)
                }} 
            />
        </ListItem>
    )
}