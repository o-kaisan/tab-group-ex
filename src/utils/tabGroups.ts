/*
 * タブのグループ化関連のユーティリティ
 */
import { LocalConvenienceStoreOutlined } from '@mui/icons-material'
import { type GroupRule } from '../components/TabPanel'
import * as url from '../utils/url'

export const DEFAULT_MODE = 'Default'
export const DOMAIN_MODE = 'Domain'
export const CUSTOM_MODE = 'Custom'

export interface SavedTabGroupInfo {
  // タブグループのId
  // ストレージ保存用のタイプ
  type: string
  // 保存時のグループID
  id: number
  // タブグループのタイトル
  title: string
  // タブグループに保存されているタブ
  urlList: string[]
}

/*
 * 指定した条件でタブを取得する
 * ※タブが取得できなかった場合は空の配列を返す。
 */
async function getTabs (targetTabConditions: chrome.tabs.QueryInfo) {
  const tabs: chrome.tabs.Tab[] = await chrome.tabs.query(targetTabConditions)
  return tabs
}

/*
 * グループ化されていないタブを取得する
 */
async function getNoneGroupedTabs () {
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
function getTabIdList (targetTabList: chrome.tabs.Tab[]) {
  const tabIdList: number[] = []
  targetTabList.map((tab: chrome.tabs.Tab) => {
    if (tab.id !== undefined) {
      tabIdList.push(tab.id)
    }
  })
  return tabIdList
}

/*
 * タブグループ名にヒットしたタブグループのIDを返す
 */
async function getTabGroupIdByTitle (title: string) {
  const tabgroups: chrome.tabGroups.TabGroup[] = await getAllTabGroupList()
  let tabGroupId
  tabgroups.map((tabgroup) => {
    if (tabgroup.title === title) {
      tabGroupId = tabgroup.id
    }
  })
  return tabGroupId
}

/*
 * 新しくタブをグループ化する
 */
async function createTabGroups (tabIdList: number[], title: string = '') {
  if (tabIdList.length === 0) {
    return
  }
  const groupId = await chrome.tabs.group({ tabIds: tabIdList })
  if (title === '') {
    title = groupId.toString()
  }
  try {
    chrome.tabGroups.update(groupId, {
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
async function updateTabGroups (tabIdList: number[], title: string) {
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
 *　設定に従ってタブをグループ化
 */
export async function groupActiveTabs (
  groupMode: string,
  groupRule: GroupRule[] | undefined,
  ignoreRule: boolean
) {
  if (groupMode === DOMAIN_MODE) {
    await groupActiveTabsByDomain()
  }

  if (groupMode === CUSTOM_MODE) {
    if (groupRule === undefined) {
      return
    }

    const groupRuleList: string[] = []
    groupRule.map((rule: GroupRule) => {
      groupRuleList.push(rule.domain)
    })
    await groupActiveTabsByCustom(groupRuleList, ignoreRule)
  }

  if (groupMode === DEFAULT_MODE) {
    await groupAllActiveTabs()
  }
}
/*
 * カスタムルールに従ってタブをグループ化
 */
async function groupActiveTabsByCustom (
  groupRules: string[],
  ignoreRule: boolean
) {
  // タブを取得
  // ルールにしたがってグループ化
  const tabs: chrome.tabs.Tab[] = await getNoneGroupedTabs()
  const domainMap: Record<string, number[]> = {}
  const domains = []
  if (groupRules.length > 0) {
    groupRules.map((domain) => {
      for (let i: number = 0; i < tabs.length; i++) {
        const tab_domain = url.getDomainNameIgnoreSubDomain(<string>tabs[i].url)
        if (tab_domain === undefined) {
          continue
        }
        // タブがドメインルールに含まれてるか確認
        if (domain !== tab_domain) {
          continue
        }
        if (domainMap[domain] === undefined) {
          domainMap[domain] = []
          domains.push(domain)
        }
        domainMap[domain].push(<number>tabs[i].id)
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
async function groupActiveTabsByDomain () {
  // タブを取得
  const tabs: chrome.tabs.Tab[] = await getNoneGroupedTabs()
  // ドメインを取得
  const domainMap: Record<string, number[]> = {}
  const domains = []
  for (let i: number = 0; i < tabs.length; i++) {
    const domain = url.getDomainNameIgnoreSubDomain(<string>tabs[i].url)
    if (domain === undefined) {
      continue
    }
    if (domainMap[domain] === undefined) {
      domainMap[domain] = []
      domains.push(domain)
    }
    domainMap[domain].push(<number>tabs[i].id)
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
async function groupAllActiveTabs () {
  const tabs = await getNoneGroupedTabs()
  const tabIdList: number[] = getTabIdList(tabs)
  await createTabGroups(tabIdList)
}

/*
 * 指定したグループ化を解除
 */
export async function ungroupTabs (tabGroupId: number) {
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
export async function getAllTabGroupList () {
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
async function getTabGroupList (
  targetTabGroupConditions: chrome.tabGroups.QueryInfo
) {
  const tabGroupList: chrome.tabGroups.TabGroup[] =
    await chrome.tabGroups.query(targetTabGroupConditions)
  return tabGroupList
}

/*
 * タブグループを開/閉を切り替える
 */
export async function toggleTabGroupCollapsed (
  tabGroupId: number,
  collapsed: boolean
) {
  const updateProperties: chrome.tabGroups.UpdateProperties = {
    collapsed
  }
  await chrome.tabGroups.update(tabGroupId, updateProperties)
}

async function getTabUrls (tabGroupId: number) {
  /*
   * タブグループからタブのURL一覧を取得ｓるう
   */
  const targetTabGroupConditions = {
    groupId: tabGroupId
  }
  const urls = []
  const tabs = await getTabs(targetTabGroupConditions)
  tabs.map((tab) => {
    urls.push(tab.url)
  })
  return urls
}

function isExistTabGroupTitle (
  tabGroupTitle: string,
  savedTabGroup: SavedTabGroupInfo[]
): boolean {
  let ret = false
  savedTabGroup.map((savedTabGroup: SavedTabGroupInfo) => {
    if (tabGroupTitle === savedTabGroup.title) {
      ret = true
    }
  })
  return ret
}

// 保存されたタブグループに同一のタイトルがないかを確認し、あれば末尾に(n)を追加する
function duplicateRenameTabGroupTitle (
  tabGroupTitle: string,
  savedTabGroup: SavedTabGroupInfo[],
  count: number = 1
): string {
  console.log(isExistTabGroupTitle(tabGroupTitle, savedTabGroup))
  if (isExistTabGroupTitle(tabGroupTitle, savedTabGroup)) {
    const regexp = /^(.+)\([0-9]+\)$/
    // タイトルについている"(数値)"を取り除く
    const TabGroupTitleWithoutNumber: string = tabGroupTitle.replace(
      regexp,
      '$1'
    )
    // リネーム
    console.log(tabGroupTitle)
    const renamedTabGroupTitle: string = `${TabGroupTitleWithoutNumber}(${count})`
    console.log(renamedTabGroupTitle)
    return duplicateRenameTabGroupTitle(
      renamedTabGroupTitle,
      savedTabGroup,
      count + 1
    )
  } else {
    return tabGroupTitle
  }
}

export async function saveTabGroup (tabGroupId: number, tabGroupTitle: string) {
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
  if (tabGroupTitle == undefined) return
  const storageTitle: string = 'TG_' + renamedTabGroupTitle + tabGroupId
  await chrome.storage.local.set({ [storageTitle]: saveTabGroupInfo })
}

export async function deleteTabGroup (
  tabgroupTitle: string,
  tabGroupId: number
) {
  /*
   * タブグループをストレージから削除する
   */
  const targetTabGroup: string = 'TG_' + tabgroupTitle + tabGroupId
  await chrome.storage.local.remove(targetTabGroup)
}

export async function getAllSavedTabGroup () {
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

async function restoreTab (url: string) {
  const createProperties: chrome.tabs.CreateProperties = {
    active: false,
    url
  }
  const tab = await chrome.tabs.create(createProperties)
  return tab.id
}

export async function restoreTabGroup (
  tabgroupTitle: string | undefined,
  urlList: string[]
) {
  /*
   * 指定したタブグループを復元する
   */
  // 一通りタブを開く　chrome.tabs.create
  // 新しく開いたタブのIDをリスト化する
  // もともと設定されているグループの名前でグループ化する
  // 新しくタブグループを作成するとsavedTabGroupのidが変わるからupdateすること

  const tabIdList = []
  const result = await Promise.all(
    urlList.map(async (url) => {
      const tabId = restoreTab(url)
      return await tabId
    })
  )
  result.map((tabId) => {
    if (tabId !== undefined) {
      tabIdList.push(tabId)
    }
  })
  await createTabGroups(tabIdList, tabgroupTitle)
}

export async function closeTabGroup (tabGroupId: number) {
  const targetTabConditions: chrome.tabs.QueryInfo = {
    groupId: tabGroupId
  }
  const tabs = await getTabs(targetTabConditions)
  const tabsIds = await getTabIdList(tabs)
  await chrome.tabs.remove(tabsIds)
}

export async function updateTabGroupName (
  tabGroupId: number,
  tabGroupTitle: string
) {
  const updateProperties: chrome.tabGroups.UpdateProperties = {
    title: tabGroupTitle
  }
  await chrome.tabGroups.update(tabGroupId, updateProperties)
}
