import type { GroupRule } from '../types/groupRule'

const GROUP_RULE_KEY = "groupRule"

/*
 * グループルールをローカルストレージに保存する
 */
export async function saveGroupRule(groupRule: GroupRule[]): Promise<void> {
    await chrome.storage.local.set({ groupRule })
}

/*
 * ローカルストレージに保存されているグループルールを取得する
 */
export async function getGroupRules(): Promise<GroupRule[]> {
    const storageData = await chrome.storage.local.get(GROUP_RULE_KEY)
    let ret: any = storageData.groupRule
    if (ret === undefined) {
        ret = []
    }
    return ret
}
