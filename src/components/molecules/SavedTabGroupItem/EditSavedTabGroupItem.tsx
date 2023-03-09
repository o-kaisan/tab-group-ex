import React from 'react'
import { ListItem } from '@mui/material'
import ApplyIcon from '../../atoms/Icons/ApplyIcon'
import CancelIcon from '../../atoms/Icons/CancelIcon'
import { updateSavedTabGroupName } from '../../../common/libs/savedTabGroup'
import TextField from '../../atoms/Inputs/TextField'

interface Props {
    tabGroupId: number
    tabGroupTitle: string
    setEditMode: React.Dispatch<React.SetStateAction<boolean>>
    updateSavedTabGroupList: Function
}

export default function EditSavedTabGroupItem(props: Props): JSX.Element {
    // 変更前の名前
    const [title, setTitle] = React.useState(props.tabGroupTitle)
    // 変更後の名前
    const [renamedTitle, setRenamedTitle] = React.useState(props.tabGroupTitle)

    const updateSavedTabGroupTitle = (id: number, title: string, renamedTitle: string): void => {
        // ストレージの更新
        void updateSavedTabGroupName(id, title, renamedTitle).then(() => {
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
        updateSavedTabGroupTitle(props.tabGroupId, title, renamedTitle)
    }

    return (
        <ListItem>
            <TextField
                defaultValue={props.tabGroupTitle}
                placeholder={'Saved Tab Group Name'}
                onChange={handleTextChange}
                onKeyDown={handleKeyDown}
            />
            <ApplyIcon
                onClick={() => {
                    updateSavedTabGroupTitle(props.tabGroupId, title, renamedTitle)
                }}
            />
            <CancelIcon
                onClick={() => {
                    cancelEditMode()
                }}
            />
        </ListItem >
    )
}
