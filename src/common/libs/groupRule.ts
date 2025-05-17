import type { GroupRule } from '../types/groupRule'
import { v4 as uuidv4 } from 'uuid'

const GROUP_RULE_KEY = "groupRule"

/**
 * グループルールをローカルストレージに保存する
 */
export async function saveGroupRule(groupRule: GroupRule[]): Promise<void> {
    await chrome.storage.local.set({ groupRule })
}

/**
 * ローカルストレージに保存されているグループルールを取得する
 */
export async function getGroupRules(): Promise<GroupRule[]> {
    const storageData = await chrome.storage.local.get(GROUP_RULE_KEY)
    let ret: any = storageData.groupRule
    const init = {
        domain: '',
        id: uuidv4()
    }
    if (ret === undefined) {
        // １つもなかった場合は空文字の設定を用意する
        ret = [init]
    } else if (ret.length === 0) {
        ret = [init]
    }
    return ret
}
