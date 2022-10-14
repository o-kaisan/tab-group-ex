import React from 'react';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import OptionMenus from "./OptionMenus"
import { Collapse, IconButton, ListItem, ListItemButton, ListSubheader } from "@mui/material";
import {saveTabGroup, toggleTabGroupCollapsed, getAllSavedTabGroup, restoreTabGroup, deleteTabGroup} from "../utils/tabGroups"

export interface Props {
    // タブグループの一覧のステート
    activeTabGroup: chrome.tabGroups.TabGroup[] | undefined
    // タブグループの一覧を更新するメソッド
    setActiveTabGroup: any
    // タブグループを保存するメソッド
    getSavedTabGroupList: any
    // タブグループを更新するメソッド
    updatedTabGroupList: any
}

export default function ActiveTabGroupList(props: Props) {
    // グループ名の編集モード
    const [editMode, setEditMode] = React.useState(false);

    const updateTabGroupCollapsed = (tabGroupId: number, collapsed: boolean) => {
        toggleTabGroupCollapsed(tabGroupId, !collapsed);
        props.updatedTabGroupList()
      }

      const runSaveTabGroup = (tabGroupId:number, tabGroupTitle: string | undefined) => {
        if (tabGroupTitle == undefined) return
        saveTabGroup(tabGroupId, tabGroupTitle).then(() => props.getSavedTabGroupList())
      }

    if (props.activeTabGroup == undefined) {
        return(
          <ListItem>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText>No Groups Saved...</ListItemText>
              </ListItemButton>
            </List>
          </ListItem>
        );
      }
      return (
        <List component="div" disablePadding>
          {props.activeTabGroup.map((tabGroup) => (
          <ListItem>
            <ListItemButton sx={{ pl: 4 }} onClick={() => updateTabGroupCollapsed(tabGroup.id, tabGroup.collapsed)}>
            <ListItemText>{tabGroup.title}</ListItemText>
            </ListItemButton>
                <IconButton onClick={() => runSaveTabGroup(tabGroup.id, tabGroup.title)}>
                   <SaveAltIcon />
                </IconButton>
            <OptionMenus tabGroupId={tabGroup.id} updatedTabGroupList={props.updatedTabGroupList} />
          </ListItem>
          ))}
        </List>
      )
}