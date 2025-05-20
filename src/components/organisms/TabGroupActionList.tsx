import React, { useEffect, useState } from 'react'
import { ListSubheader } from '@mui/material'
import { styled } from '@mui/material/styles';
import LayersIcon from '@mui/icons-material/Layers'
import StyledList from './StyledList'
import { type Action, ActionType } from '../../common/const/action'
import { type ShortcutMap, getShortcutMap } from '../../common/libs/shortcut'
import SaveCurrentTabGroup from '../molecules/TabGroupActionItem/SaveCurrentTabGroup'
import GroupCurrentTabs from '../molecules/TabGroupActionItem/GroupCurrentTabs'
import UnGroupAllTabs from '../molecules/TabGroupActionItem/UnGroupAllTabs'
import RestoreFavoriteSavedTabGroup from '../molecules/TabGroupActionItem/RestoreFavoriteTabGroup';
import ActionNotificationSetting from '../molecules/TabGroupActionItem/ActionNotificationSetting';


interface Props {
    updateCurrentTabGroupList: () => void
    updateSavedTabGroupList: () => void
}

export default function TabGroupActionList(props: Props): JSX.Element {
    const [shortcuts, setShortcuts] = useState<ShortcutMap>({})

    useEffect(() => {
        getShortcutMap().then((cmds) => {
            setShortcuts(cmds)
        }).catch((e) => { console.log(e) })
    }, [])

    const resolveShortcutKey = (actionType: Action): string => {
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
            <StyledListSubheader>Action Notification</StyledListSubheader>
            <ActionNotificationSetting />
            <StyledListSubheader>Group tabs</StyledListSubheader>
            {/** 未グループ化タブをグループ化 */}
            <GroupCurrentTabs
                updateCurrentTabGroupList={props.updateCurrentTabGroupList}
                title={"Group ungrouped tabs"}
                actionType={ActionType.GROUP_ALL}
                shortcutKey={resolveShortcutKey(ActionType.GROUP_ALL)}
            >
                <LayersIcon fontSize="small" />
            </GroupCurrentTabs>
            {/** ドメインごとにグループ化 */}
            <GroupCurrentTabs
                updateCurrentTabGroupList={props.updateCurrentTabGroupList}
                title={"Group by domain"}
                actionType={ActionType.GROUP_BY_DOMAIN}
                shortcutKey={resolveShortcutKey(ActionType.GROUP_BY_DOMAIN)}
            >
                <LayersIcon fontSize="small" />
            </GroupCurrentTabs>
            {/** 指定したドメインごとにグループ化 */}
            <GroupCurrentTabs
                updateCurrentTabGroupList={props.updateCurrentTabGroupList}
                title={"Group by custom domain"}
                actionType={ActionType.GROUP_BY_CUSTOM_DOMAIN}
                shortcutKey={resolveShortcutKey(ActionType.GROUP_BY_CUSTOM_DOMAIN)}
            >
                <LayersIcon fontSize="small" />
            </GroupCurrentTabs>
            {/** タブグループの保存 */}
            <StyledListSubheader>Save groups</StyledListSubheader>
            <SaveCurrentTabGroup
                updateSavedTabGroupList={props.updateSavedTabGroupList}
                shortcutKey={resolveShortcutKey(ActionType.SAVE_GROUP)}
            />
            <StyledListSubheader>Restore group</StyledListSubheader>
            {/* お気に入りのタブグループを復元する */}
            <RestoreFavoriteSavedTabGroup
                updateCurrentTabGroupList={props.updateCurrentTabGroupList}
                shortcutKey={resolveShortcutKey(ActionType.UNGROUP_ALL_GROUP)}
            />

            <StyledListSubheader>Ungroup tabs</StyledListSubheader>
            {/** 全てのタブグループを解除 */}
            <UnGroupAllTabs
                updateCurrentTabGroupList={props.updateCurrentTabGroupList}
                shortcutKey={resolveShortcutKey(ActionType.UNGROUP_ALL_GROUP)}
            />
        </StyledList >
    )
}

const StyledListSubheader = styled(ListSubheader)(({ theme }) => ({
    height: "2.5rem"
}));
