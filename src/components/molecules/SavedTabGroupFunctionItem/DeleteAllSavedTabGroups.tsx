import React from 'react'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import { ListItem, ListItemButton } from '@mui/material'
import LayersClearIcon from '@mui/icons-material/LayersClear'
import { deleteAllTabGroups } from '../../../common/libs/savedTabGroup'


interface Props {
    updateSavedTabGroupList: Function
}

export default function DeleteAllSavedTabGroups(props: Props): JSX.Element {
    /*
     * ストレージに保存されているタブを削除する // TODO
     */
    const handleClick = (): void => {
        deleteAllTabGroups()
            .then(() => {
                props.updateSavedTabGroupList()
            })
            .catch((error) => {
                console.log(error)
            })
    }
    return (
        <ListItem>
            <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                    <LayersClearIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>タブグループを全て削除</ListItemText>
            </ListItemButton>
        </ListItem>
    )
}
