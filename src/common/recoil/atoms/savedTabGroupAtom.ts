import { atom } from "recoil";
import type { SavedTabGroupInfo } from '../../types/savedTabGroupInfo'

export const savedTabGroupState = atom<SavedTabGroupInfo[]>({
    key: "savedTabGroupState",
    default: [],
})