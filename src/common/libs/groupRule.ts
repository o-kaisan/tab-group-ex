import type { GroupRule } from '../types/groupRule'

/*
 * グループルールをローカルストレージに保存する
 */
export async function saveGroupRule(groupRule: GroupRule[]): Promise<void> {
    await chrome.storage.local.set({ groupRule })
}

/*
 * ローカルストレージに保存されているグループルールを取得する
 */
export async function getGroupRule(): Promise<GroupRule[]> {
    const groupRuleKV = await chrome.storage.local.get('groupRule')
    let ret = groupRuleKV.groupRule
    if (ret === undefined) {
        ret = []
    }
    return ret
}
