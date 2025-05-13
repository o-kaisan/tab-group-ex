import React from 'react'
import StyledList from './StyledList'
import { ListSubheader } from '@mui/material'
import GroupCurrentTabs from '../molecules/TabGroupActionItem/GroupCurrentTabs'
import UnGroupAllTabs from '../molecules/TabGroupActionItem/UnGroupAllTabs'
import { GroupMode } from '../../common/types/groupMode'
import LayersIcon from '@mui/icons-material/Layers'


interface Props {
    updateCurrentTabGroupList: () => void
    updateSavedTabGroupList: () => void
}

export default function TabGroupActionList(props: Props): JSX.Element {
    return (
        <StyledList>
            <ListSubheader>Actions</ListSubheader>
            {/* 未グループ化タブをグループ化 */}
            <GroupCurrentTabs updateCurrentTabGroupList={props.updateCurrentTabGroupList} title={"Group ungrouped tabs"} groupMode={GroupMode.all}>
                <LayersIcon fontSize="small" />
            </GroupCurrentTabs>
            {/* ドメインごとにグループ化 */}
            <GroupCurrentTabs updateCurrentTabGroupList={props.updateCurrentTabGroupList} title={"Group tabs by domain"} groupMode={GroupMode.domain}>
                <LayersIcon fontSize="small" />
            </GroupCurrentTabs>

            {/* 指定したドメインごとにグループ化 */}
            <GroupCurrentTabs updateCurrentTabGroupList={props.updateCurrentTabGroupList} title={"Group tabs by custom domain"} groupMode={GroupMode.customDomain}>
                <LayersIcon fontSize="small" />
            </GroupCurrentTabs>

            {/* 全てのタブグループを解除 */}
            <UnGroupAllTabs updateCurrentTabGroupList={props.updateCurrentTabGroupList} />
        </StyledList>
    )
}
