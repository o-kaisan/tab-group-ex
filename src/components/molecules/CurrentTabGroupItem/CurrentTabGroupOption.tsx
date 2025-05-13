import * as React from 'react'
import { closeTabGroup, ungroupTabs } from '../../../common/libs/tabGroup'
// import MenuEditItem from '../../atoms/Menu/MenuItem/MenuEditItem'
import MenuCloseItem from '../../atoms/Menu/MenuItem/MenuCloseItem'
import MenuUngroupItem from '../../atoms/Menu/MenuItem/MenuUngroupItem'
import OptionIcon from '../../atoms/Icons/OptionIcon'
import { StyledMenu } from '../../atoms/Menu/StyledMenu/StyledMenu'
import { sendCloseGroupMessageToTab, sendUngroupMessageToTab } from '../../../common/libs/message'

interface Props {
    tabGroupId: number
    updateCurrentTabGroupList: Function
    open: boolean
    anchorEl: HTMLElement | null
    setAnchorEl: Function
}

export default function CurrentTabGroupOption(props: Props): JSX.Element {
    const handleStyledMenuClose = (): void => {
        props.setAnchorEl(null)
    }

    const handleMenuUngroupItemClick = (tabGroupId: number): void => {
        /*
         * アクティブなウィンドウのタブグループを全て解除
         */
        props.setAnchorEl(null)
        void ungroupTabs(tabGroupId).then(() => {
            // 表示を更新
            props.updateCurrentTabGroupList()

            // context_scriptにメッセージを渡す
            sendUngroupMessageToTab().catch((e) => { console.log(e) })
        })
    }

    const handleMenuCloseItemClick = (tabGroupId: number): void => {
        handleStyledMenuClose()
        void closeTabGroup(tabGroupId).then(() => {
            // 表示を更新
            props.updateCurrentTabGroupList()

            // context_scriptにメッセージを渡す
            sendCloseGroupMessageToTab().catch((e) => { console.log(e) })
        })
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
                {/* <MenuEditItem onClick={handleMenuEditItemClick} /> */}
                <MenuCloseItem
                    onClick={() => {
                        handleMenuCloseItemClick(props.tabGroupId)
                    }}
                />
                <MenuUngroupItem
                    onClick={() => {
                        handleMenuUngroupItemClick(props.tabGroupId)
                    }}
                />
            </StyledMenu>
        </div>
    )
}
