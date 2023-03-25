// import { getAutoGroup } from '../common/libs/autoGroup'
// import { getGroupMode } from '../common/libs/groupMode'
// import { groupTabs } from '../common/libs/tabGroup'
// import { GROUP_MODE } from '../common/types/groupMode'

// /*
//  * タブを追加した時の処理
//  */
// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//     // グループ化の自動
//     //  TODO タブが変更される度にタブのグループ化が多重実行してエラーが起きるの修正する
//     void getAutoGroup()
//         .then((autoGroup) => {
//             void getGroupMode()
//                 .then((groupMode) => {
//                     if (groupMode !== GROUP_MODE.domain && groupMode !== GROUP_MODE.customDomain) {
//                         return
//                     }
//                     if (autoGroup) {
//                         groupTabs(groupMode)
//                             .then()
//                             .catch((error) => {
//                                 console.log(error)
//                             })
//                     }
//                 })
//                 .catch((error) => {
//                     console.log(error)
//                 })
//         })
//         .catch((error) => {
//             console.log(error)
//         })
// })
