import type { SavedTabGroupInfo, Url } from '../types/savedTabGroupInfo'
import { getCurrentTab } from './tab'
import { getUrlsFromTabGroup, createTabGroups, getTabGroupByTabGroupId } from './tabGroup'

// ストレージのキー
const SAVED_TAB_GROUP_KEY: string = "savedTabGroups"

/**
 * タブグループを保存する
 */
export async function saveTabGroup(tabGroupTitle: string, tabGroupId: number, color: string): Promise<void> {
    // タブグループに含まれるページを取得
    const urls = await getUrlsFromTabGroup(tabGroupId)
    if (urls.length === 0) {
        return
    }

    const savedTabGroups = await getAllSavedTabGroup()

    let isTabGroupExist = false
    const newSavedTabGroups: SavedTabGroupInfo[] = []
    savedTabGroups.forEach((savedTabGroup: SavedTabGroupInfo) => {

        if (tabGroupTitle !== savedTabGroup.title) {
            newSavedTabGroups.push(savedTabGroup)
            return
        }

        // 既に同じタブグループ名が存在する場合はurlを更新する
        isTabGroupExist = true
        newSavedTabGroups.push({ ...savedTabGroup, urls, color })
    })

    // 保存対象が既に保存済みタブグループ存在していなければ新たに追加
    if (!isTabGroupExist) {
        const newTabGroup: SavedTabGroupInfo = {
            id: resolveStorageKeyforTabGroup(tabGroupTitle, tabGroupId),
            tabGroupId,
            title: tabGroupTitle,
            urls,
            color,
            isFavorited: false,
        }
        newSavedTabGroups.push(newTabGroup)
    }

    await chrome.storage.local.set({ savedTabGroups: newSavedTabGroups })
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

/**
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

/**
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

/**
 * お気に入りした保存済みのタブグループを復元すsる
 */
export async function restoreFavoriteTabGroup(callback: (result: boolean) => void): Promise<void> {
    const tabgGroups = await getAllSavedTabGroup()

    // 既に同じタブグループ名が存在する場合はurlを更新する
    let favoriteTabgroups: SavedTabGroupInfo[] = []

    tabgGroups.forEach((tabGroup) => {
        if (tabGroup.isFavorited === true) {
            favoriteTabgroups.push(tabGroup)
        }
    })

    // お気に入りのタブグループが見つからなかった場合
    if (favoriteTabgroups.length === 0) {
        callback(false)
        return
    }

    favoriteTabgroups.forEach((favoriteTabgroup) => {
        restoreTabGroup(favoriteTabgroup.title, favoriteTabgroup.urls)
    })
    callback(true)

}

/**
 * 保存済みのタブをお気に入り登録する
 */
export async function favoriteTabgroup(tabGroupTitle: string, tabGroupId: number, isFavorited: boolean) {
    const savedTabGroups = await getAllSavedTabGroup()

    let isTabGroupExist = false
    const newSavedTabGroups: SavedTabGroupInfo[] = []
    savedTabGroups.forEach((savedTabGroup: SavedTabGroupInfo) => {
        if (tabGroupTitle === savedTabGroup.title) {
            isTabGroupExist = true
            newSavedTabGroups.push({ ...savedTabGroup, isFavorited: isFavorited })
            return
        }
        newSavedTabGroups.push(savedTabGroup)
    })

    if (!isTabGroupExist) {
        // 保存対象が既に保存済みタブグループ存在していなければ何もしない
        return
    }
    // ストレージを更新
    await chrome.storage.local.set({ savedTabGroups: newSavedTabGroups })
}

/**
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

/**
 * タブグループをストレージから削除する
 */
export async function deleteTabGroup(tabGroupTitle: string, tabGroupId: number): Promise<void> {
    const savedTabGroups = await getAllSavedTabGroup()
    const targetTabGroupId: string = resolveStorageKeyforTabGroup(tabGroupTitle, tabGroupId)
    const newSavedTabGroups = savedTabGroups.filter((savedTabGroup) => savedTabGroup.id !== targetTabGroupId)
    await updateSavedTabGroups(newSavedTabGroups)
}

/**
 * タブグループのアイテム(Url)を削除する
 */
export async function deletePage(tabGroupTitle: string, tabGroupId: number, index: number): Promise<void> {
    const savedTabGroups = await getAllSavedTabGroup()
    const targetTabGroupId: string = resolveStorageKeyforTabGroup(tabGroupTitle, tabGroupId)

    const newSavedTabGroups: SavedTabGroupInfo[] = []
    savedTabGroups.forEach((tabGroup: SavedTabGroupInfo) => {
        if (tabGroup.id !== targetTabGroupId) {
            newSavedTabGroups.push(tabGroup)
            return
        }

        const newUrls = tabGroup.urls.filter((_, i) => i !== index);
        if (newUrls.length !== 0) {
            newSavedTabGroups.push({ ...tabGroup, urls: newUrls })
        }
    })

    await updateSavedTabGroups(newSavedTabGroups)
}

/**
 * ストレージにタブグループを保存するためのkeyを生成する
 */
function resolveStorageKeyforTabGroup(tabGroupTitle: string, tabGroupId: number): string {
    const TabGroupKey: string = `${tabGroupTitle}_${String(tabGroupId)}`
    return TabGroupKey
}

/**
 * 保存されたタブグループの名前を更新する
 */
export async function updateSavedTabGroupName(tabGroupId: number, title: string, renamedTitle: string, color: string): Promise<void> {
    await deleteTabGroup(title, tabGroupId)
    await saveTabGroup(renamedTitle, tabGroupId, color)
}

/**
 * 保存されたタブグループを一括更新する
 */
export async function updateSavedTabGroups(savedTabGroups: SavedTabGroupInfo[]): Promise<void> {
    // 一度ローカルストレージに保存しているタブグループを削除する
    await chrome.storage.local.remove(SAVED_TAB_GROUP_KEY)
    // 再度ローカルストレージにタブグループを保存する
    await chrome.storage.local.set({ savedTabGroups })
}

/**
 * 現在開いているタブが所属するタブグループを保存する
 */
export async function saveCurrentTabGroupToStorage(callback?: (tabId: number) => void): Promise<void> {
    const tab = await getCurrentTab()
    if (tab === undefined) return
    if (tab.id === undefined) return

    const tabGroup = await getTabGroupByTabGroupId(tab.groupId)
    if (tabGroup === undefined) return

    let tabGroupTitle = String(tabGroup.id)
    if (tabGroup.title !== undefined) {
        tabGroupTitle = tabGroup.title
    }
    await saveTabGroup(tabGroupTitle, tabGroup.id, tabGroup.color)

    if (callback) {
        callback(tab.id)
    }
}