import React from 'react'
import EditCurrentTabGroup from './EditCurrentTabGroup'
import DisplayCurrentTabGroup from './DisplayCurrentTabGroup'

interface Props {
    tabGroupId: number
    collapsed: boolean
    tabGroupTitle?: string
    updateCurrentTabGroupList: Function
}

export default function CurrentTabGroupItem(props: Props): JSX.Element {
    const resolveTitle = (title: string | undefined): string => {
        if (title === undefined) {
            title = 'none title'
        }
        return title
    }
    const _title = resolveTitle(props.tabGroupTitle)

    const [editMode, setEditMode] = React.useState(false)

    // TODO タブグループをクリックしたらURL一覧がでるように

    return (
        <div>
            {editMode ? (
                // TODO Editモード開くと画面幅が変わる
                <EditCurrentTabGroup
                    tabGroupId={props.tabGroupId}
                    tabGroupTitle={_title}
                    setEditMode={setEditMode}
                    updateCurrentTabGroupList={props.updateCurrentTabGroupList}
                />
            ) : (
                <DisplayCurrentTabGroup
                    tabGroupId={props.tabGroupId}
                    collapsed={props.collapsed}
                    tabGroupTitle={_title}
                    setEditMode={setEditMode}
                    updateCurrentTabGroupList={props.updateCurrentTabGroupList}
                />
            )}
        </div>
    )
}
