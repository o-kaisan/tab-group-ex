import { IconButton, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {getAllTabGroupList, saveTabGroup, toggleTabGroupCollapsed, SavedTabGroupInfo, getAllSavedTabGroup, restoreTabGroup, deleteTabGroup} from "../utils/tabGroups"
import React from "react";

export interface Props {
    // タブグループID
    savedTabGroup: SavedTabGroupInfo[] | undefined
    // 保存されたタブグループを取得するメソッド
    getSavedTabGroupList: any
    // タブグループを更新するメソッド
    updatedTabGroupList: any

}

export default function SavedTabGroupList(props: Props) {
    const runDeleteTabGroup = (tabGroupTitle: string | undefined, tabGroupId: number) => {
        if (tabGroupTitle == undefined) return
        deleteTabGroup(tabGroupTitle, tabGroupId).then(() => props.getSavedTabGroupList())
    }

    const runRestoreTabGroup = (tabGroupTitle:string | undefined, urlList: string[]) => {
        restoreTabGroup(tabGroupTitle, urlList).then(() => {
            props.updatedTabGroupList()
          }).catch((error)=>console.log(error))
    }

    if (props.savedTabGroup == undefined) {
        return(
          <ListItem>
            <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText>No Groups...</ListItemText>
            </ListItemButton>
            </List>
          </ListItem>
        );
     }
      return (
        <List component="div" disablePadding>
          {props.savedTabGroup.map((tabGroup) => (
          <ListItem>
            <ListItemButton sx={{ pl: 4 }} onClick={() => {runRestoreTabGroup(tabGroup.title, tabGroup.urlList)}}>
            <ListItemText>{tabGroup.title}</ListItemText>
            </ListItemButton>
                <IconButton onClick={() => runDeleteTabGroup(tabGroup.title, tabGroup.id)}>
                   <DeleteForeverIcon />
                </IconButton>
          </ListItem>
          ))}
        </List>
      )
}