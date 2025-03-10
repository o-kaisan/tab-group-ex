import type { SavedTabGroupInfo, Url } from '../types/savedTabGroupInfo'
import { getUrlsFromTabGroup, createTabGroups } from './tabGroup'

// ストレージのキー
const SAVED_TAB_GROUP_KEY: string = "savedTabGroups"

/*
 * タブグループを保存する
 */
export async function saveTabGroup(tabGroupTitle: string, tabGroupId: number, color: string): Promise<void> {
    const urls = await getUrlsFromTabGroup(tabGroupId)
    if (urls.length === 0) {
        return
    }

    const savedTabGroups = await getAllSavedTabGroup()

    // 同じ名前のグループ名があるかを確認し、同じ名前があればrename
    const renamedTabGroupTitle = duplicateRenameTabGroupTitle(tabGroupTitle, savedTabGroups)

    const targetTabGroup: SavedTabGroupInfo = {
        id: resolveStorageKeyforTabGroup(renamedTabGroupTitle, tabGroupId),
        tabGroupId,
        title: renamedTabGroupTitle,
        urls,
        color
    }

    // タブグループがundefinedだったらストレージに保存せずに返却
    if (tabGroupTitle === undefined) return
    savedTabGroups.push(targetTabGroup)
    await chrome.storage.local.set({ savedTabGroups })
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
export async function getSavedTabGroup(tabGroupTitle: string, tabGroupId: number): Promise<SavedTabGroupInfo | undefined> {
    const savedTabGroups = await getAllSavedTabGroup()
    const id = resolveStorageKeyforTabGroup(tabGroupTitle, tabGroupId)

    let ret: SavedTabGroupInfo | undefined
    savedTabGroups.forEach((savedTabGroup) => {
        if (savedTabGroup.id !== id) {
            ret = savedTabGroup
        }
    })
    return ret
}

/*
 * ローカルストレージから保存されたタブグループを取得する
 */
export async function getAllSavedTabGroup(): Promise<SavedTabGroupInfo[]> {
    const storageData: any = await chrome.storage.local.get(SAVED_TAB_GROUP_KEY)
    const savedTabGroups: SavedTabGroupInfo[] = storageData.savedTabGroups

    if (typeof savedTabGroups === "undefined") {
        return []
    }
    return savedTabGroups
}

/*
 * 指定したタブグループを復元する
 */
export async function restoreTabGroup(tabGroupTitle: string, urls: Url[]): Promise<void> {
    // 一通りタブを開くchrome.tabs.create
    // 新しく開いたタブのIDをリスト化する
    // もともと設定されているグループの名前でグループ化する
    // 新しくタブグループを作成するとsavedTabGroupのidが変わるからupdateすること
    const result = await Promise.all(
        urls.map(async (url) => {
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
async function restoreTab(url: Url): Promise<number | undefined> {
    const createProperties: chrome.tabs.CreateProperties = {
        active: false,
        url: url.url,
    }
    const tab = await chrome.tabs.create(createProperties)
    return tab.id
}

/*
 * タブグループをストレージから削除する
 */
export async function deleteTabGroup(tabGroupTitle: string, tabGroupId: number): Promise<void> {
    const savedTabGroups = await getAllSavedTabGroup()
    const targetTabGroup: string = resolveStorageKeyforTabGroup(tabGroupTitle, tabGroupId)
    const deletedSavedTabGroups = savedTabGroups.filter((savedTabGroup) => savedTabGroup.id !== targetTabGroup)
    await updateSavedTabGroups(deletedSavedTabGroups)
}

/*
 * ストレージにタブグループを保存するためのkeyを生成する
 */
function resolveStorageKeyforTabGroup(tabGroupTitle: string, tabGroupId: number): string {
    const TabGroupKey: string = `${tabGroupTitle}_${String(tabGroupId)}`
    return TabGroupKey
}

/*
 * 保存されたタブグループの名前を更新する
 */
export async function updateSavedTabGroupName(tabGroupId: number, title: string, renamedTitle: string, color: string): Promise<void> {
    await deleteTabGroup(title, tabGroupId)
    await saveTabGroup(renamedTitle, tabGroupId, color)
}

/*
 * 保存されたタブグループを一括更新する
 */
export async function updateSavedTabGroups(savedTabGroups: SavedTabGroupInfo[]): Promise<void> {
    // 一度ローカルストレージに保存しているタブグループを削除する
    await chrome.storage.local.remove(SAVED_TAB_GROUP_KEY)
    // 再度ローカルストレージにタブグループを保存する
    await chrome.storage.local.set({ savedTabGroups })
}

