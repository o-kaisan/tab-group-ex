// TODO 全体的にリファクタリングしたい

/*
 * タブのグループ化関連のユーティリティ
 */
import type { GroupRule } from '../interface/groupRule'
import * as url from '../utils/url'
import { GROUP_MODE } from '../const/groupMode'
import type { SavedTabGroupInfo } from '../interface/savedTabGroupInfo'

/*
 * 指定した条件でタブを取得する
 * ※タブが取得できなかった場合は空の配列を返す。
 */
async function getTabs(
  targetTabConditions: chrome.tabs.QueryInfo
): Promise<chrome.tabs.Tab[]> {
  const tabs: chrome.tabs.Tab[] = await chrome.tabs.query(targetTabConditions)
  return tabs
}

/*
 * グループ化されていないタブを取得する
 */
async function getNoneGroupedTabs(): Promise<chrome.tabs.Tab[]> {
  const targetTabConditions: chrome.tabs.QueryInfo = {
    currentWindow: true,
    pinned: false,
    url: ['http://*/*', 'https://*/*'],
    groupId: chrome.tabGroups.TAB_GROUP_ID_NONE
  }
  const tabs: chrome.tabs.Tab[] = await getTabs(targetTabConditions)
  return tabs
}

/*
 * タブ配列をタブIDのリストを返却
 * ※タブが取得できなかった場合は空の配列を返す。
 */
function getTabIdList(targetTabList: chrome.tabs.Tab[]): number[] {
  const tabIdList: number[] = []
  targetTabList.forEach((tab: chrome.tabs.Tab) => {
    if (tab.id !== undefined) {
      tabIdList.push(tab.id)
    }
  })
  return tabIdList
}

/*
 * タブグループ名にヒットしたタブグループのIDを返す
 */
async function getTabGroupIdByTitle(
  title: string
): Promise<number | undefined> {
  const tabgroups: chrome.tabGroups.TabGroup[] = await getAllTabGroupList()
  let tabGroupId: number | undefined
  tabgroups.forEach((tabgroup) => {
    if (tabgroup.title === title) {
      tabGroupId = tabgroup.id
    }
  })
  return tabGroupId
}

/*
 * 新しくタブをグループ化する
 */
async function createTabGroups(
  tabIdList: number[],
  title: string = ''
): Promise<number> {
  if (tabIdList.length === 0) {
    return -1 // IDになり得ないマイナスの値を返す
  }
  const groupId = await chrome.tabs.group({ tabIds: tabIdList })
  if (title === '') {
    title = groupId.toString()
  }
  try {
    void chrome.tabGroups.update(groupId, {
      collapsed: false,
      title
    })
  } catch (err) {
    console.log('failed to update title :%d', err)
  }
  return groupId
}

/*
 * タブグループを更新する
 */
async function updateTabGroups(
  tabIdList: number[],
  title: string
): Promise<void> {
  if (tabIdList.length === 0) {
    return
  }
  let groupId: number | undefined = await getTabGroupIdByTitle(title)

  // 指定したグループ名がなければ新規作成
  if (groupId === undefined) {
    groupId = await createTabGroups(tabIdList, title)
    return
  }
  // グループが既に存在していれば追加する
  await chrome.tabs.group({ groupId, tabIds: tabIdList })
}

/*
 * 設定に従ってタブをグループ化
 */
export async function groupActiveTabs(
  groupMode: string,
  groupRule: GroupRule[] | undefined,
  ignoreRule: boolean
): Promise<void> {
  if (groupMode === GROUP_MODE.DOMAIN) {
    await groupActiveTabsByDomain()
  }

  if (groupMode === GROUP_MODE.CUSTOM) {
    if (groupRule === undefined) {
      return
    }

    const groupRuleList: string[] = []
    groupRule.forEach((rule: GroupRule) => {
      groupRuleList.push(rule.domain)
    })
    await groupActiveTabsByCustom(groupRuleList, ignoreRule)
  }

  if (groupMode === GROUP_MODE.DEFAULT) {
    await groupAllActiveTabs()
  }
}
/*
 * カスタムルールに従ってタブをグループ化
 * サブドメインも含むグループ化となる
 */
async function groupActiveTabsByCustom(
  groupRules: string[],
  ignoreRule: boolean
): Promise<void> {
  // タブを取得
  // ルールにしたがってグループ化
  const tabs: chrome.tabs.Tab[] = await getNoneGroupedTabs()
  const domainMap: Record<string, number[]> = {}
  const domains: string[] = []
  if (groupRules.length > 0) {
    groupRules.forEach((domain) => {
      for (let i: number = 0; i < tabs.length; i++) {
        const targetUrl = tabs[i].url
        if (targetUrl === undefined) {
          continue
        }
        const tabDomain = url.getDomainNameIgnoreSubDomain(targetUrl)
        if (tabDomain === undefined) {
          continue
        }
        // タブがドメインルールに含まれてるか確認
        if (domain !== tabDomain) {
          continue
        }
        if (domainMap[domain] === undefined) {
          domainMap[domain] = []
          domains.push(domain)
        }
        const targetId = tabs[i].id
        if (targetId === undefined) {
          continue
        }
        domainMap[domain].push(targetId)
      }
    })
    // ドメイン分グループ化を繰り返す
    await Promise.all(
      domains.map(async (domain) => {
        const groupIds: number[] = domainMap[domain]
        try {
          await updateTabGroups(groupIds, domain)
        } catch (err) {
          console.log('failed to group by custom rule :', err)
        }
      })
    )
  }

  // ルール外のタブをグループ化
  if (ignoreRule) {
    try {
      await groupAllActiveTabs()
    } catch (err) {
      console.log('failed to group non-rule tabs %d', err)
    }
  }
}

/*
 * タブをドメインごとにグループ化
 */
async function groupActiveTabsByDomain(): Promise<void> {
  // タブを取得
  const tabs: chrome.tabs.Tab[] = await getNoneGroupedTabs()
  // ドメインを取得
  const domainMap: Record<string, number[]> = {}
  const domains = []
  for (let i: number = 0; i < tabs.length; i++) {
    const targetUrl = tabs[i].url
    if (targetUrl === undefined) {
      continue
    }
    const domain = url.getDomainNameIgnoreSubDomain(targetUrl)
    if (domain === undefined) {
      continue
    }
    if (domainMap[domain] === undefined) {
      domainMap[domain] = []
      domains.push(domain)
    }
    const targetId = tabs[i].id
    if (targetId === undefined) {
      continue
    }
    domainMap[domain].push(targetId)
  }
  // ドメイン分グループ化を繰り返す
  await Promise.all(
    domains.map(async (domain) => {
      const groupIds: number[] = domainMap[domain]
      await updateTabGroups(groupIds, domain)
    })
  )
}

/*
 * タブを全てグループ化
 */
async function groupAllActiveTabs(): Promise<void> {
  const tabs = await getNoneGroupedTabs()
  const tabIdList: number[] = getTabIdList(tabs)
  await createTabGroups(tabIdList)
}

/*
 * 指定したグループ化を解除
 */
export async function ungroupTabs(tabGroupId: number): Promise<void> {
  const targetTabConditions: chrome.tabs.QueryInfo = {
    currentWindow: true,
    pinned: false,
    groupId: tabGroupId
  }
  const tabs = await getTabs(targetTabConditions)
  const tabIdList: number[] = getTabIdList(tabs)

  if (tabIdList.length === 0) return
  await chrome.tabs.ungroup(tabIdList)
}

/*
 * アクティブなウィドウのタブグループ一覧を取得
 */
export async function getAllTabGroupList(): Promise<
  chrome.tabGroups.TabGroup[]
> {
  const targetTabGroupConditions: chrome.tabGroups.QueryInfo = {
    windowId: chrome.windows.WINDOW_ID_CURRENT
  }
  const ret: chrome.tabGroups.TabGroup[] = await getTabGroupList(
    targetTabGroupConditions
  )
  return ret
}

/*
 * タブグループ一覧を取得
 * タググループが存在しない場合は空のリストを返す
 */
async function getTabGroupList(
  targetTabGroupConditions: chrome.tabGroups.QueryInfo
): Promise<chrome.tabGroups.TabGroup[]> {
  const tabGroupList: chrome.tabGroups.TabGroup[] =
    await chrome.tabGroups.query(targetTabGroupConditions)
  return tabGroupList
}

/*
 * タブグループを開/閉を切り替える
 */
export async function toggleTabGroupCollapsed(
  tabGroupId: number,
  collapsed: boolean
): Promise<void> {
  const updateProperties: chrome.tabGroups.UpdateProperties = {
    collapsed
  }
  await chrome.tabGroups.update(tabGroupId, updateProperties)
}

async function getTabUrls(tabGroupId: number): Promise<string[]> {
  /*
   * タブグループからタブのURL一覧を取得ｓるう
   */
  const targetTabGroupConditions = {
    groupId: tabGroupId
  }
  const urls: string[] = []
  const tabs = await getTabs(targetTabGroupConditions)
  tabs.forEach((tab) => {
    if (tab.url !== undefined) {
      urls.push(tab.url)
    }
  })
  return urls
}

function isExistTabGroupTitle(
  tabGroupTitle: string,
  savedTabGroup: SavedTabGroupInfo[]
): boolean {
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
    const TabGroupTitleWithoutNumber: string = tabGroupTitle.replace(
      regexp,
      '$1'
    )
    // リネーム
    const renamedTabGroupTitle: string = `${TabGroupTitleWithoutNumber}(${count})`
    return duplicateRenameTabGroupTitle(
      renamedTabGroupTitle,
      savedTabGroup,
      count + 1
    )
  } else {
    return tabGroupTitle
  }
}

export async function saveTabGroup(
  tabGroupId: number,
  tabGroupTitle: string
): Promise<void> {
  /*
   * タブグループを保存する
   */
  const urls = await getTabUrls(tabGroupId)
  if (urls.length === 0) {
    return
  }

  const savedTabGroups = await getAllSavedTabGroup()

  // 同じ名前のグループ名があるかを確認し、同じ名前があればrename
  const renamedTabGroupTitle = duplicateRenameTabGroupTitle(
    tabGroupTitle,
    savedTabGroups
  )

  const saveTabGroupInfo: SavedTabGroupInfo = {
    type: 'TGEX',
    id: tabGroupId,
    title: renamedTabGroupTitle,
    urlList: urls
  }

  // タブグループがundifinedだったらストレージに保存せずに返却
  if (tabGroupTitle === undefined) return
  const storageTitle: string = `TG_${String(renamedTabGroupTitle)}${String(
    tabGroupId
  )}`
  await chrome.storage.local.set({ [storageTitle]: saveTabGroupInfo })
}

// 指定したタブグループをストレージから取得する
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export async function getTabGroupFromStorage(key: string) {
  const ret = await chrome.storage.local.get(key)
  return ret[key]
}

export async function updateSavedTabGroupName(
  tabGroupId: number,
  title: string,
  renamedTitle: string
): Promise<void> {
  const targetTabGroup: string = `TG_${String(title)}${String(tabGroupId)}`

  // 名前を変換するために保存前の情報を取得
  const tabGroupObj = await getTabGroupFromStorage(targetTabGroup)

  // 元の保存されたタブグループを削除
  await deleteTabGroup(title, tabGroupId)

  // 同じ名前のグループ名があるかを確認し、同じ名前があればrename
  const savedTabGroups = await getAllSavedTabGroup()
  const renamedTabGroupTitle = duplicateRenameTabGroupTitle(
    renamedTitle,
    savedTabGroups
  )

  // 新しく名前を変更してストレージに保存
  const storageTitle: string = `TG_${String(renamedTitle)}${String(tabGroupId)}`
  const saveTabGroupInfo: SavedTabGroupInfo = {
    type: 'TGEX',
    id: tabGroupId,
    title: renamedTabGroupTitle,
    urlList: tabGroupObj.urlList
  }
  await chrome.storage.local.set({ [storageTitle]: saveTabGroupInfo })
}

export async function deleteTabGroup(
  tabgroupTitle: string,
  tabGroupId: number
): Promise<void> {
  /*
   * タブグループをストレージから削除する
   */
  const targetTabGroup: string = `TG_${String(tabgroupTitle)}${String(
    tabGroupId
  )}`
  await chrome.storage.local.remove(targetTabGroup)
}

export async function getAllSavedTabGroup(): Promise<SavedTabGroupInfo[]> {
  /*
   * ローカルストレージから保存されたタブグループを取得する
   */
  const storageData = await chrome.storage.local.get(null)
  const ret: SavedTabGroupInfo[] = []
  Object.keys(storageData).forEach((key) => {
    if (storageData[key].type === 'TGEX') {
      ret.push(storageData[key])
    }
  })
  return ret
}

async function restoreTab(url: string): Promise<number | undefined> {
  const createProperties: chrome.tabs.CreateProperties = {
    active: false,
    url
  }
  const tab = await chrome.tabs.create(createProperties)
  return tab.id
}

export async function restoreTabGroup(
  tabgroupTitle: string,
  urlList: string[]
): Promise<void> {
  /*
   * 指定したタブグループを復元する
   */
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
  await createTabGroups(tabIdList, tabgroupTitle)
}

export async function closeTabGroup(tabGroupId: number): Promise<void> {
  const targetTabConditions: chrome.tabs.QueryInfo = {
    groupId: tabGroupId
  }
  const tabs = await getTabs(targetTabConditions)
  const tabsIds = getTabIdList(tabs)
  await chrome.tabs.remove(tabsIds)
}

export async function updateTabGroupName(
  tabGroupId: number,
  tabGroupTitle: string
): Promise<void> {
  const updateProperties: chrome.tabGroups.UpdateProperties = {
    title: tabGroupTitle
  }
  await chrome.tabGroups.update(tabGroupId, updateProperties)
}
