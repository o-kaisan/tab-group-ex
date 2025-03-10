import React, { useState } from 'react'
import { Typography, IconButton, Tooltip, Box } from '@mui/material'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import RemoveIcon from '@mui/icons-material/Remove'

interface TextTruncatorProps {
    text: string
    maxLength?: number
    className?: string
}

// 半角1文字、全角2文字としてカウントする関数
const getAdjustedLength = (text: string): number => {
    return text.split('').reduce((acc, char) => acc + (char.charCodeAt(0) > 255 ? 2 : 1), 0)
}

// 指定の長さで文字列を切り取る関数
const truncateText = (text: string, maxLength: number): string => {
    let length = 0
    let result = ''
    for (const char of text) {
        length += char.charCodeAt(0) > 255 ? 3 : 1
        if (length > maxLength) break
        result += char
    }
    return result
}

export default function TextTruncator({ text, maxLength = 30, className = '' }: TextTruncatorProps): JSX.Element {
    const [isExpanded, setIsExpanded] = useState(false)

    // 調整後の文字数で判定
    const adjustedLength = getAdjustedLength(text)
    const shouldTruncate = adjustedLength > maxLength

    // 表示するテキストを決定
    const displayText = shouldTruncate && !isExpanded ? `${truncateText(text, maxLength)}...` : text

    const handleOnClick = (): void => {
        setIsExpanded(!isExpanded)
    }

    return (
        <Box display="flex" alignItems="center" className={className}>
            <Typography variant="body1" component="span">
                {displayText}
            </Typography>

            {shouldTruncate && (
                <Tooltip title={isExpanded ? '折りたたむ' : '続きを見る'}>
                    <IconButton size="small" onClick={handleOnClick} sx={{ ml: 0.5, p: 0.5 }}>
                        {isExpanded ? <RemoveIcon fontSize="small" /> : <MoreHorizIcon fontSize="small" />}
                    </IconButton>
                </Tooltip>
            )}
        </Box>
    )
}
