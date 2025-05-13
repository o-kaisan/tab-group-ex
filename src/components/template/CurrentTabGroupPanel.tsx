import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import CurrentTabGroupList from '../organisms/CurrentTabGroupList'
import TabGroupFunctionList from '../organisms/TabGroupFunctionList'
import TabPanel from '../atoms/TabPanel/TabPanel'
import { getAllTabGroupList } from '../../common/libs/tabGroup'
import { currentTabGroupState } from '../../common/recoil/atoms/currentTabGroupAtom'
/*
 * 拡張機能のメニュー
 */
interface Props {
    panelTab: number
    index: number
}

export default function CurrentTabGroupPanel(props: Props): JSX.Element {
    // タブグループの一覧
    const [currentTabGroups, setCurrentTabGroups] = useRecoilState(currentTabGroupState)

    // 画面表示時にウィンドウのタブグループを読み込む
    useEffect(() => {
        getAllTabGroupList()
            .then((tabGroupList: chrome.tabGroups.TabGroup[]) => {
                setCurrentTabGroups(tabGroupList)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    // 現在のウィンドウにあるタブグループを取得し、表示を最新化する
    const updateCurrentTabGroupList = (): void => {
        getAllTabGroupList()
            .then((tabGroupList) => {
                setCurrentTabGroups(tabGroupList)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <TabPanel value={props.panelTab} index={props.index}>
            <TabGroupFunctionList updateCurrentTabGroupList={updateCurrentTabGroupList} />
            <CurrentTabGroupList
                currentTabGroups={currentTabGroups}
                updateCurrentTabGroupList={updateCurrentTabGroupList}
            />
        </TabPanel>
    )
}
