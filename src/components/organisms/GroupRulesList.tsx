import React, { useEffect, useState } from 'react'
import ListItem from '@mui/material/ListItem'
import List from '@mui/material/List'
import IconButton from '@mui/material/IconButton'
import ClearIcon from '@mui/icons-material/Clear'
import Button from '@mui/material/Button'
import TextField from '@material-ui/core/TextField'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import { v4 as uuidv4 } from 'uuid'
import type { GroupRule } from '../../common/types/groupRule'
import { getGroupRules, saveGroupRule } from '../../common/libs/groupRule'
import { Box, createTheme, Paper, ThemeProvider, Typography } from '@mui/material'

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2'
        },
        error: {
            main: '#d32f2f'
        },
        success: {
            main: '#2e7d32'
        }
    }
})

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
            <Typography variant="body2" color="text.secondary" sx={{ ml: 2, mr: 2, mt: 1, mb: 1 }}>
                This configuration is for custom domains. Add the domains to be grouped together. Subdomains will be
                ignored.
            </Typography>
            <ExamplesDescription />
            {groupRule.map((rule: GroupRule, index: number) => (
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
                        {index > 1 ? <ClearIcon /> : ''}
                    </IconButton>
                </ListItem>
            ))}
            <ListItem>
                <Button sx={{ m: 1 }} variant="outlined" size="small" onClick={handleAddDomain}>
                    Add Rule
                </Button>
                <Button sx={{ m: 1 }} variant="outlined" size="small" color="success" onClick={handleSaveGroupRule}>
                    Save Rules
                </Button>
            </ListItem>
        </List>
    )
}

function ExamplesDescription(): JSX.Element {
    return (
        <ThemeProvider theme={theme}>
            <Paper
                elevation={2}
                sx={{
                    p: 3,
                    maxWidth: 500,
                    mx: 'auto',
                    mt: 2,
                    backgroundColor: 'ghostwhite'
                }}
            >
                <Typography variant="caption" fontWeight="medium" sx={{ display: 'block', mb: 1 }}>
                    Domain format examples:
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                    <Typography variant="caption" sx={{ minWidth: 120 }}>
                        example.com
                    </Typography>
                    <ArrowRightAltIcon fontSize="small" sx={{ mx: 1 }} />
                    <Typography variant="caption">example</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="caption" sx={{ minWidth: 120 }}>
                        sub.example.com
                    </Typography>
                    <ArrowRightAltIcon fontSize="small" sx={{ mx: 1 }} />
                    <Typography variant="caption">example</Typography>
                </Box>
            </Paper>
        </ThemeProvider>
    )
}
