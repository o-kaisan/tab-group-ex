/*
 * タブグループの設定を管理する
 */
export async function saveGroupMode (groupMode: string) {
    /*
     * タブグループの設定をストレージに保存
     */
    await chrome.storage.local.set({"groupMode": groupMode});
}

export async function getSavedGroupMode() {
    const groupMode = await chrome.storage.local.get("groupMode")
    let ret = groupMode.groupMode
    if (ret == undefined) {
        ret = "Default"
    }
    return ret
}


export async function saveIgnoreRule(ignoreRule: boolean) {
    await chrome.storage.local.set({"ignoreRule": ignoreRule})
}

export async function getSavedIgnoreRule() {
    const ignoreRule = await chrome.storage.local.get("ignoreRule")
    let ret = ignoreRule.ignoreRule
    if (ret == undefined) {
        ret = false
    }
    return ret
}

export async function getSavedGroupRule() {
    const groupRule = await chrome.storage.local.get("groupRule")
    let ret = groupRule.groupRule
    if (ret == undefined) {
        ret = []
    }
    return ret
}