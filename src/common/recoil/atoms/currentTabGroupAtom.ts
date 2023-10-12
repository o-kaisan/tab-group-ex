import { atom } from "recoil";

export const currentTabGroupState = atom<chrome.tabGroups.TabGroup[]>({
    key: "currentTabGroupState",
    default: [],
})