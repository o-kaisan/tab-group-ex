import React, { useEffect, useState } from 'react'
import StyledList from './StyledList'
import { ListSubheader } from '@mui/material'
import GroupCurrentTabs from '../molecules/TabGroupActionItem/GroupCurrentTabs'
import UnGroupAllTabs from '../molecules/TabGroupActionItem/UnGroupAllTabs'
import { ActionType } from '../../common/const/action'
import LayersIcon from '@mui/icons-material/Layers'
import { type ShortcutMap, getShortcutMap } from '../../common/libs/shortcut'


interface Props {
    updateCurrentTabGroupList: () => void
}

export default function TabGroupActionList(props: Props): JSX.Element {
    const [shortcuts, setShortcuts] = useState<ShortcutMap>({})

    useEffect(() => {
        getShortcutMap().then((cmds) => {
            setShortcuts(cmds)
        }).catch((e) => { console.log(e) })
    }, [])

    const resolveShortcutKey = (actionType: string): string => {
        if (Object.keys(shortcuts).length === 0) {
            return ""
        }
        const result = shortcuts[actionType]
        if (result === undefined) {
            return result
        }
        if (result.shortcut === undefined) {
            return ""
        }
        return result.shortcut
    }

    return (
        <StyledList>
            <ListSubheader>Group tabs</ListSubheader>
            {/* 未グループ化タブをグループ化 */}
            <GroupCurrentTabs
                updateCurrentTabGroupList={props.updateCurrentTabGroupList}
                title={"Group ungrouped tabs"}
                actionType={ActionType.groupAll}
                shortcutKey={resolveShortcutKey(ActionType.groupAll)}
            >
                <LayersIcon fontSize="small" />
            </GroupCurrentTabs>
            {/* ドメインごとにグループ化 */}
            <GroupCurrentTabs
                updateCurrentTabGroupList={props.updateCurrentTabGroupList}
                title={"Group by domain"}
                actionType={ActionType.groupByDomain}
                shortcutKey={resolveShortcutKey(ActionType.groupByDomain)}
            >
                <LayersIcon fontSize="small" />
            </GroupCurrentTabs>

            {/* 指定したドメインごとにグループ化 */}
            <GroupCurrentTabs
                updateCurrentTabGroupList={props.updateCurrentTabGroupList}
                title={"Group by custom domain"}
                actionType={ActionType.groupByCustomDomain}
                shortcutKey={resolveShortcutKey(ActionType.groupByCustomDomain)}
            >
                <LayersIcon fontSize="small" />
            </GroupCurrentTabs>

            <ListSubheader>Ungroup tabs</ListSubheader>
            {/* 全てのタブグループを解除 */}
            <UnGroupAllTabs
                updateCurrentTabGroupList={props.updateCurrentTabGroupList}
                shortcutKey={resolveShortcutKey(ActionType.ungroupAll)}
            />
        </StyledList>
    )
}
