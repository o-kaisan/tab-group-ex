import React from "react";
import ListItemText from '@mui/material/ListItemText';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import OptionMenus from "./OptionMenus"
import {IconButton, ListItem, ListItemButton} from "@mui/material";
import {saveTabGroup, toggleTabGroupCollapsed, updateTabGroupName} from "../utils/tabGroups"
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { Input } from "@mui/material";

interface Props {
    // タブグループID
    id: number
    // タブグループの開閉
    collapsed: boolean
    // タブグループのタイトル
    title: string | undefined
    // getSavedTabGroupList
    getSavedTabGroupList: Function
    // updatedTabGroupListメソッド
    updatedTabGroupList: Function
}

export default function ActiveTabGroupItem(props: Props) {
    const [editMode, setEditMode] = React.useState(false);
    const [tabGroupTitle, setTabGroupTitle] = React.useState(props.title)

    const runUpdateTabGroupCollapsed = (tabGroupId: number, collapsed: boolean) => {
        toggleTabGroupCollapsed(tabGroupId, !collapsed);
        props.updatedTabGroupList()
    }

    const runSaveTabGroup = (tabGroupId:number, tabGroupTitle: string | undefined) => {
        if (tabGroupTitle == undefined) return
        saveTabGroup(tabGroupId, tabGroupTitle).then(() => props.getSavedTabGroupList())
    }

    const runUpdateTabGroupName = (tabGroupId: number, tabGroupTitle: string | undefined) => {
        if (tabGroupTitle == undefined) return
        updateTabGroupName(tabGroupId, tabGroupTitle).then(() => props.updatedTabGroupList())
        setEditMode(false)
    }

    const cancelEditMode = () => {
        setEditMode(false)
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTabGroupTitle(event.target.value);
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.nativeEvent.isComposing || event.key !== 'Enter') return
        setTabGroupTitle(tabGroupTitle);
        runUpdateTabGroupName(props.id, tabGroupTitle);
    }
    return (
    <div>
        { editMode ?
            <ListItem>
                <Input defaultValue={props.title} inputProps={{placeholder: "Tab Group Name", onChange: handleChange, onKeyDown: handleKeyDown}} />
                <IconButton onClick={() => runUpdateTabGroupName(props.id, tabGroupTitle)}>
                    <CheckIcon />
                </IconButton>
                <IconButton onClick={() => cancelEditMode()}>
                    <ClearIcon />
                </IconButton>
            </ListItem>
            :
            <ListItem>
                <ListItemButton sx={{ pl: 4 }} onClick={() => runUpdateTabGroupCollapsed(props.id, props.collapsed)}>
                    <ListItemText>{props.title}</ListItemText>
                </ListItemButton>
                <IconButton onClick={() => runSaveTabGroup(props.id, props.title)}>
                    <SaveAltIcon />
                </IconButton>
                <OptionMenus tabGroupId={props.id} updatedTabGroupList={props.updatedTabGroupList} setEditMode={setEditMode}/>
            </ListItem>
        }
    </div>
    )
}