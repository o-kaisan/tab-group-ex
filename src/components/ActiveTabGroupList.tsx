import React from 'react';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import {ListItem, ListItemButton, ListSubheader} from "@mui/material";
import ActiveTabGroupItem from './ActiveTabGroupItem';
export interface Props {
    // タブグループの一覧のステート
    activeTabGroup: chrome.tabGroups.TabGroup[] | undefined
    // タブグループを保存するメソッド
    getSavedTabGroupList: Function
    // タブグループを更新するメソッド
    updatedTabGroupList: Function
}

export default function ActiveTabGroupList(props: Props) {
  if (props.activeTabGroup == undefined) {
      return(
        <ListItem>
          <List component="div" disablePadding>
            <ListItemText>No Groups</ListItemText>
          </List>
        </ListItem>
      );
  }
  return (
    <List component="div" disablePadding>
        <ListSubheader>Active TabGroups</ListSubheader>
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