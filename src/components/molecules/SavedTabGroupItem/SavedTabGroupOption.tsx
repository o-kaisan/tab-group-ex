import * as React from 'react'
import MenuEditItem from '../../atoms/Menu/MenuItem/MenuEditItem'
import OptionIcon from '../../atoms/Icons/OptionIcon'
import { StyledMenu } from '../../atoms/Menu/StyledMenu/StyledMenu'

interface Props {
    tabGroupId: number
    setEditMode: React.Dispatch<React.SetStateAction<boolean>>
    open: boolean
    anchorEl: HTMLElement | null
    setAnchorEl: Function
}

export default function SavedTabGroupOption(props: Props): JSX.Element {
    const handleStyledMenuClose = (): void => {
        props.setAnchorEl(null)
    }

    const runEditGroupTabs = (): void => {
        props.setEditMode(true)
        handleStyledMenuClose()
    }

    return (
        <div>
            <OptionIcon open={props.open} setAnchorEl={props.setAnchorEl} />
            <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                    'aria-labelledby': 'demo-customized-button'
                }}
                anchorEl={props.anchorEl}
                open={props.open}
                onClose={handleStyledMenuClose}
            >
                <MenuEditItem onClick={runEditGroupTabs} />
            </StyledMenu>
        </div>
    )
}
