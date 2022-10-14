import React from 'react';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import OptionMenus from "./OptionMenus"
import { Collapse, IconButton, ListItem, ListItemButton, ListSubheader } from "@mui/material";
import {saveTabGroup, toggleTabGroupCollapsed, getAllSavedTabGroup, restoreTabGroup, deleteTabGroup} from "../utils/tabGroups"
import ActiveTabGroupItem from './TabGroupName';

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
            <ActiveTabGroupItem
                id={tabGroup.id}
                collapsed={tabGroup.collapsed}
                title={tabGroup.title}
                getSavedTabGroupList={props.getSavedTabGroupList}
                updatedTabGroupList={props.updatedTabGroupList}
            />
         ))}
        </List>
    )
}