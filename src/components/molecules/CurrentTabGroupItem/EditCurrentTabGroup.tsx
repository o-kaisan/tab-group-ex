import React from 'react'
import { ListItem } from '@mui/material'
import { updateTabGroupName } from '../../../common/libs/tabGroup'
import ApplyIcon from '../../atoms/Icons/ApplyIcon'
import CancelIcon from '../../atoms/Icons/CancelIcon'
import TextField from '../../atoms/Inputs/TextField'

interface Props {
    tabGroupId: number
    tabGroupTitle: string
    setEditMode: React.Dispatch<React.SetStateAction<boolean>>
    updateCurrentTabGroupList: Function
}

export default function EditCurrentTabGroup(props: Props): JSX.Element {
    const [tabGroupTitle, setTabGroupTitle] = React.useState(props.tabGroupTitle)

    const handleApplyIconClick = (tabGroupId: number, tabGroupTitle: string): void => {
        void updateTabGroupName(tabGroupId, tabGroupTitle).then(() => {
            props.updateCurrentTabGroupList()
            props.setEditMode(false)
        })
    }

    const handleCancelIconClick = (): void => {
        props.setEditMode(false)
    }

    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setTabGroupTitle(event.target.value)
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
        //  Enterキー押下時でもグループ名の更新処理が走る
        if (event.nativeEvent.isComposing || event.key !== 'Enter') return
        handleApplyIconClick(props.tabGroupId, tabGroupTitle)
    }

    return (
        <ListItem>
            <TextField
                defaultValue={tabGroupTitle}
                placeholder={'Tab Group Name'}
                onChange={handleTextChange}
                onKeyDown={handleKeyDown}
            />
            <ApplyIcon onClick={() => { handleApplyIconClick(props.tabGroupId, tabGroupTitle) }} />
            <CancelIcon onClick={() => { handleCancelIconClick() }} />
        </ListItem>
    )
}
