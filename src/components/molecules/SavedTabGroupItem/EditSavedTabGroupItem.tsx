import React from 'react'
import { ListItem } from '@mui/material'
import ApplyIcon from '../../atoms/Icons/ApplyIcon'
import CancelIcon from '../../atoms/Icons/CancelIcon'
import { updateSavedTabGroupName } from '../../../common/libs/savedTabGroup'
import TextField from '../../atoms/Inputs/TextField'
import type { SavedTabGroupInfo } from '../../../common/types/savedTabGroupInfo'

interface Props {
    savedTabGroup: SavedTabGroupInfo
    setEditMode: React.Dispatch<React.SetStateAction<boolean>>
    updateSavedTabGroupList: Function
}

export default function EditSavedTabGroupItem(props: Props): JSX.Element {
    // 変更前の名前
    const [title, setTitle] = React.useState(props.savedTabGroup.title)
    // 変更後の名前
    const [renamedTitle, setRenamedTitle] = React.useState(props.savedTabGroup.title)

    const updateSavedTabGroupTitle = (id: number, title: string, renamedTitle: string, color: string): void => {
        // ストレージの更新
        void updateSavedTabGroupName(id, title, renamedTitle, color).then(() => {
            setTitle(renamedTitle)
            props.updateSavedTabGroupList()
            props.setEditMode(false)
        })

        // titleを更新
        setTitle(renamedTitle)
    }

    const cancelEditMode = (): void => {
        props.setEditMode(false)
    }

    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setRenamedTitle(event.target.value)
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
        //  Enterキー押下時でもグループ名の更新処理が走る
        if (event.nativeEvent.isComposing || event.key !== 'Enter') return
        updateSavedTabGroupTitle(props.savedTabGroup.tabGroupId, title, renamedTitle, props.savedTabGroup.color)
    }

    return (
        <ListItem>
            <TextField
                defaultValue={props.savedTabGroup.title}
                placeholder={'Saved Tab Group Name'}
                onChange={handleTextChange}
                onKeyDown={handleKeyDown}
            />
            <ApplyIcon
                onClick={() => {
                    updateSavedTabGroupTitle(
                        props.savedTabGroup.tabGroupId,
                        title,
                        renamedTitle,
                        props.savedTabGroup.color
                    )
                }}
            />
            <CancelIcon
                onClick={() => {
                    cancelEditMode()
                }}
            />
        </ListItem>
    )
}
