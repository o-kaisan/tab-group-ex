import { getAutoGroup, runAutoGroup } from '../common/libs/autoGroup'
import { getGroupMode } from '../common/libs/groupMode'

/*
 * タブを追加した時の処理
 */
chrome.tabs.onUpdated.addListener(() => {
    // グループ化自動
    void getAutoGroup()
        .then((autoGroup) => {
            void getGroupMode()
                .then((groupMode) => {
                    runAutoGroup(groupMode, autoGroup)
                        .then()
                        .catch((error) => {
                            console.log(error)
                        })
                })
                .catch((error) => {
                    console.log(error)
                })
        })
        .catch((error) => {
            console.log(error)
        })
})
