import React, { useEffect, useState } from "react";
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import LayersIcon from '@mui/icons-material/Layers';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import WebStoriesIcon from '@mui/icons-material/WebStories';
import {getAllTabGroupList, saveTabGroup, groupAllActivateTabs, toggleTabGroupCollapsed, SavedTabGroupInfo, getAllSavedTabGroup, restoreTabGroup, deleteTabGroup} from "../utils/tabGroups"
import { Collapse, IconButton, ListItem, ListItemButton, ListSubheader } from "@mui/material";
import FolderIcon from '@mui/icons-material/Folder';
import ActiveTabGroupList from "../components/ActiveTabGroupList";
import SavedTabGroupList from "./SavedTabGroupList";

/*
 * 拡張機能のメニュー
 */
export default function MainMenu() {
    // TODO: タブグループの編集
    // TODO: ドメインごとにグループ化
    // TODO: 指定したルールで自動でタブをグループ化

    // タブグループ一覧の状態管理
    const [open, setOpen] = React.useState(true);
    // 保存タブグループ一覧の状態管理
    const [openSavedTabGroup, setOpenSavedTabGroup] = React.useState(false);
    // タブグループの一覧
    const [activeTabGroup, setActiveTabGroup] = useState<chrome.tabGroups.TabGroup[] | undefined>();
    // 保存されたタブグループの一覧
    const [savedTabGroup, setSavedTabGroup] = React.useState<SavedTabGroupInfo[] | undefined>();

    useEffect(() => {
      updatedTabGroupList();
    }, []);

    useEffect(() => {
      getSavedTabGroupList();
    }, []);

    const runGroupAllActiveTabs = () => {
      /*
       * アクティブなウィンドウのタブを全てグループ化
       */
      groupAllActivateTabs().then(() => {
          updatedTabGroupList()
      }).catch((error)=>console.log(error))
    }


    const runShowActiveTabGroupList = () => {
      /*
       * タブグループを一覧表示
       */
      updatedTabGroupList().then(() => {
        if (activeTabGroup != undefined && activeTabGroup.length > 0) {
          setOpen(!open);
        }
      }).catch((error) => {
        console.log(error);
      })
    }

    const updatedTabGroupList = async () => {
      getAllTabGroupList().then((tabGroupList) => {
          setActiveTabGroup(tabGroupList)
        }).catch((error) => {
          console.log(error);
        })
      }

      const getSavedTabGroupList = () => {
        /*
         * savedTabGroupを取得して更新する
         */
        getAllSavedTabGroup().then((savedTabGroupList) => {
          setSavedTabGroup(savedTabGroupList)
        })
      }

      const runShowSavedTabGroupList = () => {
        /*
         * 保存タブグループを一覧表示
         */
        setOpenSavedTabGroup(!openSavedTabGroup);
      }

    return (
      <List
        sx={{ width: '100%', minWidth: 340, bgcolor: 'background.paper' }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <ListItem>
          <ListItemButton onClick={runGroupAllActiveTabs}>
            <ListItemIcon>
              <LayersIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>タブをグループ化</ListItemText>
            <Typography variant="body2" color="text.secondary">
              ⌘X
            </Typography>
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemButton onClick={runShowSavedTabGroupList}>
            <ListItemIcon>
              <FolderIcon fontSize="small"/>
            </ListItemIcon>
            <ListItemText>保存タブグループ一覧</ListItemText>
            {openSavedTabGroup ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        <Collapse in={openSavedTabGroup} timeout="auto" unmountOnExit>
          <SavedTabGroupList
              savedTabGroup={savedTabGroup}
              getSavedTabGroupList={getSavedTabGroupList}
              updatedTabGroupList={updatedTabGroupList}
          />
        </Collapse>
        <Divider />
        <ListItem>
          <ListItemButton onClick={runShowActiveTabGroupList}>
            <ListItemIcon>
              <WebStoriesIcon fontSize="small"/>
            </ListItemIcon>
            <ListItemText>タブグループ一覧</ListItemText>
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <ActiveTabGroupList
              activeTabGroup={activeTabGroup}
              setActiveTabGroup={setActiveTabGroup}
              getSavedTabGroupList={getSavedTabGroupList}
              updatedTabGroupList={updatedTabGroupList}
          />
        </Collapse>
      </List>
    );
}