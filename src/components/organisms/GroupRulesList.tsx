import React from 'react'
import ListItem from '@mui/material/ListItem'
import List from '@mui/material/List'
import ListSubheader from '@mui/material/ListSubheader'
import IconButton from '@mui/material/IconButton'
import ClearIcon from '@mui/icons-material/Clear'
import Button from '@mui/material/Button'
import TextField from '@material-ui/core/TextField'
import { v4 as uuidv4 } from 'uuid'
import type { GroupRule } from '../../common/types/groupRule'
import { saveGroupRule } from '../../common/libs/groupRule'

interface Props {
    groupMode: string
    setGroupMode: React.Dispatch<React.SetStateAction<string>>
    groupRule: GroupRule[]
    setGroupRule: React.Dispatch<React.SetStateAction<GroupRule[]>>
}

export default function GroupRulesList(props: Props): JSX.Element {
    // グループ化するドメインのルールを追加する
    const handleAddDomain = (): void => {
        const _groupRule = [...props.groupRule]
        _groupRule.push({
            domain: '',
            id: uuidv4()
        })
        props.setGroupRule(_groupRule)
    }

    // グループ化するドメインのルールを削除する
    const handleDeleteDomain = (id: string): void => {
        const _groupRule = [...props.groupRule]
        const removeGroupRule = _groupRule.filter((rule) => rule.id !== id)
        props.setGroupRule(removeGroupRule)
    }

    const handleChangeDomain = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, id: string): void => {
        const index = props.groupRule.findIndex((rule) => rule.id === id)
        const _groupRule = [...props.groupRule]
        _groupRule[index].domain = event.target.value
        props.setGroupRule(_groupRule)
    }

    const handleSaveGroupRule = (): void => {
        const _groupRule = [...props.groupRule]
        void saveGroupRule(_groupRule).then()
    }

    return (
        <List>
            <ListSubheader>Group Rules For Custom</ListSubheader>
            {props.groupRule.map((rule: GroupRule) => (
                <ListItem key={rule.id}>
                    <TextField
                        label="domain"
                        id="margin-dense"
                        defaultValue={rule.domain}
                        margin="dense"
                        size="small"
                        onChange={(e: any) => {
                            handleChangeDomain(e, rule.id)
                        }}
                    />
                    <IconButton
                        onClick={() => {
                            handleDeleteDomain(rule.id)
                        }}
                    >
                        <ClearIcon />
                    </IconButton>
                </ListItem>
            ))}
            <ListItem>
                <Button sx={{ m: 1 }} variant="outlined" size="small" onClick={handleAddDomain}>
                    Add Group Rule
                </Button>
                <Button sx={{ m: 1 }} variant="outlined" size="small" color="success" onClick={handleSaveGroupRule}>
                    Save Group Rules
                </Button>
            </ListItem>
        </List>
    )
}
