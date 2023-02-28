import React from 'react'
import { Input } from '@mui/material'

interface Props {
    defaultValue: string
    placeholder: string
    onChange: Function
    onKeyDown: Function
}

export default function TextField(props: Props): JSX.Element {
    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        props.onChange(event)
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
        props.onKeyDown(event)
    }

    return (
        <Input
            defaultValue={props.defaultValue}
            inputProps={{
                placeholder: props.placeholder,
                onChange: handleTextChange,
                onKeyDown: handleKeyDown
            }}
        />
    )
}