import React, { useEffect, useState } from 'react'
import ListItem from '@mui/material/ListItem'
import List from '@mui/material/List'
import ListSubheader from '@mui/material/ListSubheader'
import IconButton from '@mui/material/IconButton'
import ClearIcon from '@mui/icons-material/Clear'
import Button from '@mui/material/Button'
import TextField from '@material-ui/core/TextField'
import { v4 as uuidv4 } from 'uuid'
import type { GroupRule } from '../../common/types/groupRule'
import { getGroupRules, saveGroupRule } from '../../common/libs/groupRule'
import { GROUP_MODE } from '../../common/types/groupMode'

export default function GroupRulesList(): JSX.Element {
    // カスタムルール
    const [groupRule, setGroupRule] = useState<GroupRule[]>([{ id: uuidv4(), domain: '' }])

    // 画面表示時にグループ化ルールを読み込む
    useEffect(() => {
        void getGroupRules().then((value: GroupRule[]) => {
            setGroupRule(value)
        })
    }, [])

    // グループ化するドメインのルールを追加する
    const handleAddDomain = (): void => {
        const _groupRule = [...groupRule]
        _groupRule.push({
            domain: '',
            id: uuidv4()
        })
        setGroupRule(_groupRule)
    }

    // グループ化するドメインのルールを削除する
    const handleDeleteDomain = (id: string): void => {
        const _groupRule = [...groupRule]
        const removeGroupRule = _groupRule.filter((rule) => rule.id !== id)
        setGroupRule(removeGroupRule)
    }

    const handleChangeDomain = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, id: string): void => {
        const index = groupRule.findIndex((rule) => rule.id === id)
        const _groupRule = [...groupRule]
        _groupRule[index].domain = event.target.value
        setGroupRule(_groupRule)
    }

    const handleSaveGroupRule = (): void => {
        const _groupRule = [...groupRule]
        void saveGroupRule(_groupRule).then()
    }

    return (
        <List>
            <ListSubheader>Group Rules For {GROUP_MODE.customDomain}</ListSubheader>
            {groupRule.map((rule: GroupRule) => (
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
