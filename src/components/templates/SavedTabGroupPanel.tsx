
import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import SavedTabGroupList from '../../components/organisms/SavedTabGroupList'
// import SavedTabGroupFunctionList from '../../components/organisms/SavedTabGroupFunctionList'
import TabPanel from '../atoms/TabPanel/TabPanel'
import { getAllSavedTabGroup } from '../../common/libs/savedTabGroup'
import { savedTabGroupState } from '../../common/recoil/atoms/savedTabGroupAtom'

interface Props {
    panelTab: number
    index: number
}

export default function SavedTabGroupPanel(props: Props): JSX.Element {
    // 保存されたタブグループの一覧
    const [savedTabGroups, setSavedTabGroups] = useRecoilState(savedTabGroupState)

    // 画面表示時にストレージに保存されたタブグループを読み込む
    useEffect(() => {
        updateSavedTabGroupList()
    }, [])

    // ストレージに保存されたタブグループを取得し、表示を最新化する
    const updateSavedTabGroupList = (): void => {
        void getAllSavedTabGroup().then((savedTabGroupList) => {
            setSavedTabGroups(savedTabGroupList)
        })
    }

    return (
        <TabPanel value={props.panelTab} index={props.index}>
            <SavedTabGroupList
                savedTabGroups={savedTabGroups}
                updateSavedTabGroupList={updateSavedTabGroupList}
            />
        </TabPanel>
    )
}
