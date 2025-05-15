import React, { useEffect, useState } from 'react'
import { ListSubheader } from '@mui/material'
import { styled } from '@mui/material/styles';
import LayersIcon from '@mui/icons-material/Layers'
import StyledList from './StyledList'
import { ActionType } from '../../common/const/action'
import { type ShortcutMap, getShortcutMap } from '../../common/libs/shortcut'
import SaveCurrentTabGroup from '../molecules/TabGroupActionItem/SaveCurrentTabGroup'
import GroupCurrentTabs from '../molecules/TabGroupActionItem/GroupCurrentTabs'
import UnGroupAllTabs from '../molecules/TabGroupActionItem/UnGroupAllTabs'
import ResotreFavoriteSavedTabGroup from '../../components/molecules/TabGroupActionItem/RestoreFavoriteTabGroup';


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
            <StyledListSubheader>Group tabs</StyledListSubheader>
            {/** 未グループ化タブをグループ化 */}
            <GroupCurrentTabs
                updateCurrentTabGroupList={props.updateCurrentTabGroupList}
                title={"Group ungrouped tabs"}
                actionType={ActionType.groupAll}
                shortcutKey={resolveShortcutKey(ActionType.groupAll)}
            >
                <LayersIcon fontSize="small" />
            </GroupCurrentTabs>
            {/** ドメインごとにグループ化 */}
            <GroupCurrentTabs
                updateCurrentTabGroupList={props.updateCurrentTabGroupList}
                title={"Group by domain"}
                actionType={ActionType.groupByDomain}
                shortcutKey={resolveShortcutKey(ActionType.groupByDomain)}
            >
                <LayersIcon fontSize="small" />
            </GroupCurrentTabs>
            {/** 指定したドメインごとにグループ化 */}
            <GroupCurrentTabs
                updateCurrentTabGroupList={props.updateCurrentTabGroupList}
                title={"Group by custom domain"}
                actionType={ActionType.groupByCustomDomain}
                shortcutKey={resolveShortcutKey(ActionType.groupByCustomDomain)}
            >
                <LayersIcon fontSize="small" />
            </GroupCurrentTabs>
            {/** タブグループの保存 */}
            <StyledListSubheader>Save groups</StyledListSubheader>
            <SaveCurrentTabGroup
                updateSavedTabGroupList={props.updateSavedTabGroupList}
                shortcutKey={resolveShortcutKey(ActionType.save)}
            />
            <StyledListSubheader>Resotre group</StyledListSubheader>
            {/* お気に入りのタブグループを復元する */}
            <ResotreFavoriteSavedTabGroup
                updateCurrentTabGroupList={props.updateCurrentTabGroupList}
                shortcutKey={resolveShortcutKey(ActionType.ungroupAll)}
            />

            <StyledListSubheader>Ungroup tabs</StyledListSubheader>
            {/** 全てのタブグループを解除 */}
            <UnGroupAllTabs
                updateCurrentTabGroupList={props.updateCurrentTabGroupList}
                shortcutKey={resolveShortcutKey(ActionType.ungroupAll)}
            />
        </StyledList >
    )
}

const StyledListSubheader = styled(ListSubheader)(({ theme }) => ({
    height: "2.5rem"
}));
