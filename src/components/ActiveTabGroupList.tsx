import React from 'react';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import {ListItem, ListItemButton} from "@mui/material";
import ActiveTabGroupItem from './ActiveTabGroupItem';

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