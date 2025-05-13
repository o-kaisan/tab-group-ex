import React from "react"
import { ListItemText } from '@mui/material'
import { styled } from '@mui/material/styles';

interface Props {
    shortcutKey: string
}

export default function ShortcutKeyItem(props: Props): JSX.Element {
    let _shortcutKey = props.shortcutKey
    const noShortCutKey = "Shortcut not set"

    // ショートカットキーが設定されていなかった場合
    if (_shortcutKey === "") {
        _shortcutKey = noShortCutKey
    }

    // ボタンのようなコンテナスタイル
    const ShortcutKeyContainer = styled('div')(({ theme }) => ({
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '72px',
        padding: '4px 10px',
        borderRadius: '6px',
        backgroundColor: theme.palette.mode === 'dark'
            ? 'rgba(66, 66, 66, 0.9)'
            : 'rgba(240, 240, 240, 0.9)',
        border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(80, 80, 80, 0.8)' : 'rgba(210, 210, 210, 0.8)'}`,
        boxShadow: '0 2px 2px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.15s ease',
        cursor: 'default',
    }));

    const StyledListItemText = styled(ListItemText)(({ theme }) => ({
        margin: 0,
        padding: 0,
        width: '100%',
        '& .MuiListItemText-primary': {
            letterSpacing: _shortcutKey === noShortCutKey ? '-0.07rem' : '0.5px',
            fontSize: '0.70rem',
            fontWeight: 600,
            fontFamily: 'monospace, "Roboto Mono", "SF Mono", "Courier New"',
            color: theme.palette.mode === 'dark' ? '#ffffff' : '#333333',
            textAlign: 'center',
        }
    }));


    // ショートカットが設定されていなかった時の文字列の間隔を狭くする
    return (
        <ShortcutKeyContainer>
            <StyledListItemText primary={_shortcutKey} />
        </ShortcutKeyContainer>
    )
}

