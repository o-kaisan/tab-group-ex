import React from "react"
import { ListItemText } from '@mui/material'
import { styled } from '@mui/material/styles';

interface Props {
    shortcutKey: string
}

export default function ShortcutKeyItem(props: Props): JSX.Element {
    return (
        <ShortcutKeyContainer>
            <StyledListItemText primary={props.shortcutKey} />
        </ShortcutKeyContainer>
    )
}

// ボタンのようなコンテナスタイル
const ShortcutKeyContainer = styled('div')(({ theme }) => ({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '4px 10px',
    borderRadius: '6px',
    backgroundColor: theme.palette.mode === 'dark'
        ? 'rgba(66, 66, 66, 0.9)'
        : 'rgba(240, 240, 240, 0.9)',
    border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(80, 80, 80, 0.8)' : 'rgba(210, 210, 210, 0.8)'}`,
    boxShadow: '0 2px 2px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.15s ease',
    cursor: 'default',
    '&:hover': {
        backgroundColor: theme.palette.mode === 'dark'
            ? 'rgba(75, 75, 75, 0.9)'
            : 'rgba(245, 245, 245, 0.9)',
        boxShadow: '0 3px 3px rgba(0, 0, 0, 0.15)',
    },
    '&:active': {
        transform: 'translateY(1px)',
        boxShadow: '0 1px 1px rgba(0, 0, 0, 0.1)',
    }
}));

const StyledListItemText = styled(ListItemText)(({ theme }) => ({
    margin: 0,
    padding: 0,
    '& .MuiListItemText-primary': {
        fontSize: '0.85rem',
        fontWeight: 600,
        fontFamily: 'monospace, "Roboto Mono", "SF Mono", "Courier New"',
        color: theme.palette.mode === 'dark' ? '#ffffff' : '#333333',
        letterSpacing: '0.5px',
        textAlign: 'center',
    }
}));