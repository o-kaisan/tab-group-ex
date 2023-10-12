import type { SavedTabGroupInfo } from '../types/savedTabGroupInfo'
import { getUrlsFromTabGroup, createTabGroups } from './tabGroup'

/*
 * タブグループを保存する
 */
export async function saveTabGroup(tabGroupTitle: string, tabGroupId: number): Promise<void> {
    const urls = await getUrlsFromTabGroup(tabGroupId)
    if (urls.length === 0) {
        return
    }

    const savedTabGroups = await getAllSavedTabGroup()

    // 同じ名前のグループ名があるかを確認し、同じ名前があればrename
    const renamedTabGroupTitle = duplicateRenameTabGroupTitle(tabGroupTitle, savedTabGroups)

    const saveTabGroupInfo: SavedTabGroupInfo = {
        type: 'TGEX',
        tabGroupId,
        title: renamedTabGroupTitle,
        urlList: urls
    }

    // タブグループがundefinedだったらストレージに保存せずに返却
    if (tabGroupTitle === undefined) return
    const storageKey: string = resolveStorageKeyforTabGroup(renamedTabGroupTitle, tabGroupId)
    await chrome.storage.local.set({ [storageKey]: saveTabGroupInfo })
}

/*
 * 保存されたタブグループに同一のタイトルが存在するかを確認する
 */
function isExistTabGroupTitle(tabGroupTitle: string, savedTabGroup: SavedTabGroupInfo[]): boolean {
    let ret = false
    savedTabGroup.forEach((savedTabGroup: SavedTabGroupInfo) => {
        if (tabGroupTitle === savedTabGroup.title) {
            ret = true
        }
    })
    return ret
}

// 保存されたタブグループに同一のタイトルがないかを確認し、あれば末尾に(n)を追加する
function duplicateRenameTabGroupTitle(
    tabGroupTitle: string,
    savedTabGroup: SavedTabGroupInfo[],
    count: number = 1
): string {
    if (isExistTabGroupTitle(tabGroupTitle, savedTabGroup)) {
        const regexp = /^(.+)\([0-9]+\)$/
        // タイトルについている"(数値)"を取り除く
        const TabGroupTitleWithoutNumber: string = tabGroupTitle.replace(regexp, '$1')
        // リネーム
        const renamedTabGroupTitle: string = `${TabGroupTitleWithoutNumber}(${count})`
        return duplicateRenameTabGroupTitle(renamedTabGroupTitle, savedTabGroup, count + 1)
    } else {
        return tabGroupTitle
    }
}

// 指定したタブグループをストレージから取得する
// eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
export async function getTabGroupFromStorage(key: string): Promise<{ [key: string]: any }> {
    const savedTabGroup = await chrome.storage.local.get(key)
    return savedTabGroup
}

/*
 * ローカルストレージから保存されたタブグループを取得する
 */
export async function getAllSavedTabGroup(): Promise<SavedTabGroupInfo[]> {
    const storageData = await chrome.storage.local.get(null)
    const ret: SavedTabGroupInfo[] = []
    Object.keys(storageData).forEach((key) => {
        if (storageData[key].type === 'TGEX') {
            ret.push(storageData[key])
        }
    })
    return ret
}

/*
 * 指定したタブグループを復元する
 */
export async function restoreTabGroup(tabGroupTitle: string, urlList: string[]): Promise<void> {
    // 一通りタブを開くchrome.tabs.create
    // 新しく開いたタブのIDをリスト化する
    // もともと設定されているグループの名前でグループ化する
    // 新しくタブグループを作成するとsavedTabGroupのidが変わるからupdateすること

    const result = await Promise.all(
        urlList.map(async (url) => {
            const tabId = restoreTab(url)
            return await tabId
        })
    )
    const tabIdList: number[] = []
    result.forEach((tabId) => {
        if (tabId !== undefined) {
            tabIdList.push(tabId)
        }
    })
    await createTabGroups(tabIdList, tabGroupTitle)
}

/*
 * タブを復元する
 */
async function restoreTab(url: string): Promise<number | undefined> {
    const createProperties: chrome.tabs.CreateProperties = {
        active: false,
        url
    }
    const tab = await chrome.tabs.create(createProperties)
    return tab.id
}

/*
 * タブグループをストレージから削除する
 */
export async function deleteTabGroup(tabGroupTitle: string, tabGroupId: number): Promise<void> {
    if (tabGroupId === undefined) {
        const targetTabGroup: string = resolveStorageKeyforTabGroup(tabGroupTitle, tabGroupId)
        await chrome.storage.local.remove(targetTabGroup)
    }
    else {
        // tabGroupIdが"undefined"の可能性があるのでその場合は同じタイトルを削除する
        const regex = new RegExp("^.*_" + tabGroupTitle + "_.*$")
        const storageData = await chrome.storage.local.get(null)

        await Promise.all(
            Object.keys(storageData).map(async (key) => {
                if (key !== null && key !== undefined && regex.test(key)) {
                    await chrome.storage.local.remove(key)
                }
            })
        )
    }
}

/*
 * タブグループをストレージから削除する
 */
export async function deleteAllTabGroups(): Promise<void> {
    const savedTabGroups: SavedTabGroupInfo[] = await getAllSavedTabGroup()
    await Promise.all(
        savedTabGroups.map(async (savedTabGroup) => {
            await deleteTabGroup(savedTabGroup.title, savedTabGroup.tabGroupId)
        }))
}



/*
 * ストレージにタブグループを保存するためのkeyを生成する
 */
function resolveStorageKeyforTabGroup(tabGroupTitle: string, tabGroupId: number): string {
    if (tabGroupId === undefined) {
        console.log("tabGroupId was undifined.", tabGroupTitle, tabGroupId)
    }
    const TabGroupKey: string = `TG_${tabGroupTitle}_${String(tabGroupId)}`
    return TabGroupKey
}

/*
 * 保存されたタブグループの名前を更新する
 */
export async function updateSavedTabGroupName(tabGroupId: number, title: string, renamedTitle: string): Promise<void> {
    await deleteTabGroup(title, tabGroupId)
    await saveTabGroup(renamedTitle, tabGroupId)
}

