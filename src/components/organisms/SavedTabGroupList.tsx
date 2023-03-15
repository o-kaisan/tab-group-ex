import React, { useEffect, useState } from 'react'
import { List, ListSubheader } from '@mui/material'
import SavedTabGroupItem from '../../components/molecules/SavedTabGroupItem/SavedTabGroupItem'
import NoListItem from '../molecules/NoListItem/NoListItem'
import { getAllSavedTabGroup } from '../../common/libs/savedTabGroup'
import type { SavedTabGroupInfo } from '../../common/types/savedTabGroupInfo'

export default function SavedTabGroupList(): JSX.Element {
    // 保存されたタブグループの一覧
    const [savedTabGroup, setSavedTabGroup] = useState<SavedTabGroupInfo[]>([])

    // 画面表示時にストレージに保存されたタブグループを読み込む
    useEffect(() => {
        updateSavedTabGroupList()
    }, [])

    // ストレージに保存されたタブグループを取得し、表示を最新化する
    const updateSavedTabGroupList = (): void => {
        void getAllSavedTabGroup().then((savedTabGroupList) => {
            setSavedTabGroup(savedTabGroupList)
        })
    }

    return (
        <List>
            <ListSubheader>Saved TabGroups</ListSubheader>
            {savedTabGroup.length > 0 ? (
                savedTabGroup.map((tabGroup) => (
                    <SavedTabGroupItem
                        key={tabGroup.tabGroupId}
                        tabGroupId={tabGroup.tabGroupId}
                        tabGroupTitle={tabGroup.title}
                        urlList={tabGroup.urlList}
                        updateSavedTabGroupList={updateSavedTabGroupList}
                    />
                ))
            ) : (
                <NoListItem />
            )}
        </List>
    )
}
