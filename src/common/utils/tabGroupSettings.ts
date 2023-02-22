import type { GroupRule } from '../interface/groupRule'
import { GROUP_MODE } from '../const/groupMode'

/*
 * タブグループの設定を管理する
 */
export async function saveGroupMode(groupMode: string): Promise<void> {
  /*
   * タブグループの設定をストレージに保存
   */
  await chrome.storage.local.set({ groupMode })
}

export async function getSavedGroupMode(): Promise<string> {
  const groupModeKV = await chrome.storage.local.get('groupMode')
  let ret: string = groupModeKV.groupMode
  if (ret === undefined) {
    ret = GROUP_MODE.DEFAULT
  }
  return ret
}

export async function saveIgnoreRule(ignoreRule: boolean): Promise<void> {
  await chrome.storage.local.set({ ignoreRule })
}

export async function saveGroupRule(groupRule: GroupRule[]): Promise<void> {
  await chrome.storage.local.set({ groupRule })
}

export async function getSavedIgnoreRule(): Promise<boolean> {
  const ignoreRuleKV = await chrome.storage.local.get('ignoreRule')
  let ret = ignoreRuleKV.ignoreRule
  if (ret === undefined) {
    ret = false
  }
  return ret
}

export async function getSavedGroupRule(): Promise<GroupRule[]> {
  const groupRuleKV = await chrome.storage.local.get('groupRule')
  let ret = groupRuleKV.groupRule
  if (ret === undefined) {
    ret = []
  }
  return ret
}
