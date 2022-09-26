/**
 * タブグループ化(Chrome拡張機能)
 * ポップアップメニュ
 */

import ReactDOM from "react-dom";
import React, { useEffect, useState } from "react";
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import LayersIcon from '@mui/icons-material/Layers';
import LayersClearIcon from '@mui/icons-material/LayersClear';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import WebStoriesIcon from '@mui/icons-material/WebStories';
import {getAllTabGroupList, saveTabGroup, groupAllActivateTabs, toggleTabGroupCollapsed, ungroupAllTabs, SavedTabGroupInfo, getAllSavedTabGroup, restoreTabGroup, deleteTabGroup} from "../utils/tabGroups"
import { Collapse, IconButton, ListItem, ListItemButton, ListSubheader } from "@mui/material";
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import ReportIcon from '@mui/icons-material/Report';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import FolderIcon from '@mui/icons-material/Folder';

/*
 * 拡張機能のメニュー
 */
export default function PopupMenu() {
  // TODO: タブグループの保存
  // TODO: タブグループの削除
  // TODO: タブグループ選択後に一括表示
  // TODO: タブグループの編集
  // TODO: ドメインごとにグループ化
  // TODO: 指定したルールで自動でタブをグループ化
  // TODO: アクティブなタブのグループのみグループ化解除

  // BUG: グループ化解除してからしばらくはタブグループ一覧リストが展開できてしまう

  // タブグループ一覧の状態管理
  const [open, setOpen] = React.useState(false);
  // 保存タブグループ一覧の状態管理
  const [openSavedTabGroup, setOpenSavedTabGroup] = React.useState(false);
  // タブグループの一覧
  const [data, setData] = useState<chrome.tabGroups.TabGroup[] | undefined>();
  // 保存されたタブグループの一覧
  const [savedTabGroup, setSavedTabGroup] = React.useState<SavedTabGroupInfo[] | undefined>()

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

  const runUnGroupTabs = () => {
    /*
     * アクティブなウィンドウのタブグループを全て解除
     */
    ungroupAllTabs().then(() => {
        updatedTabGroupList()
    });
  }

  const runShowActiveTabGroupList = () => {
    /*
     * タブグループを一覧表示
     */
    // TODO: タブの色をグループの色に対応したものにできたらいいな
    updatedTabGroupList().then(() => {
      if (data != undefined && data.length > 0) {
        setOpen(!open);
      }
    }).catch((error) => {
      console.log(error);
    })
  }

  const updatedTabGroupList = async () => {
    getAllTabGroupList().then((tabGroupList) => {
        setData(tabGroupList)
      }).catch((error) => {
        console.log(error);
      })
    }

  const updateTabGroupCollapsed = (tabGroupId: number, collapsed: boolean) => {
    if (data != undefined){
          setData(() =>
            data.map(tabGroup => tabGroup.id === tabGroupId ? {...tabGroup, collapsed: !collapsed} : tabGroup))
      }
    toggleTabGroupCollapsed(tabGroupId, !collapsed);
  }

  const runSaveTabGroup = (tabGroupId:number, tabGroupTitle: string | undefined) => {
    if (tabGroupTitle == undefined) return
    saveTabGroup(tabGroupId, tabGroupTitle).then(() => getSavedTabGroupList())

  }

  const ActiveTabGroupList = () => {
      if (data == undefined) {
        return(
          <ListItem>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ReportIcon>
                  <RocketLaunchIcon />
                </ReportIcon>
                <ListItemText>No Groups Saved...</ListItemText>
              </ListItemButton>
            </List>
          </ListItem>
        );
      }
      return (
        <List component="div" disablePadding>
          {data.map((tabGroup) => (
          <ListItem>
            <ListItemButton sx={{ pl: 4 }} onClick={() => updateTabGroupCollapsed(tabGroup.id, tabGroup.collapsed)}>
            <ListItemIcon>
              <RocketLaunchIcon />
            </ListItemIcon>
            <ListItemText>{tabGroup.title}</ListItemText>
            </ListItemButton>
                <IconButton onClick={() => runSaveTabGroup(tabGroup.id, tabGroup.title)}>
                   <SaveAltIcon />
                </IconButton>
          </ListItem>
          ))}
        </List>
      )
    }

    const getSavedTabGroupList = () => {
      /*
       * savedTabGroupを取得して更新する
       */
      getAllSavedTabGroup().then((savedTabGroupList) => {
        console.log("get savedtabgroup")
        setSavedTabGroup(savedTabGroupList)
      })
    }

    const runDeleteTabGroup = (tabGroupTitle: string | undefined, tabGroupId: number) => {
        if (tabGroupTitle == undefined) return
        deleteTabGroup(tabGroupTitle, tabGroupId).then(() => getSavedTabGroupList())
      }

    const runShowSavedTabGroupList = () => {
      /*
       * 保存タブグループを一覧表示
       */
      setOpenSavedTabGroup(!openSavedTabGroup);
    }

    const SavedTabGroupList = () => {
      if (savedTabGroup == undefined) {
        return(
          <ListItem>
            <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ReportIcon>
                <RocketLaunchIcon />
              </ReportIcon>
              <ListItemText>No Groups...</ListItemText>
            </ListItemButton>
            </List>
          </ListItem>
        );
      }
      return (
        <List component="div" disablePadding>
          {savedTabGroup.map((tabGroup) => (
          <ListItem>
            <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <RocketLaunchIcon />
            </ListItemIcon>
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

  return (
    <Paper sx={{ width: 320, maxWidth: '100%' }}>
      <List
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Tab Group EX
          </ListSubheader>
        }
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
        <ListItem>
          <ListItemButton onClick={runUnGroupTabs}>
            <ListItemIcon>
              <LayersClearIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>タブグループを解除</ListItemText>
            <Typography variant="body2" color="text.secondary">
              ⌘C
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
          <SavedTabGroupList />
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
          <ActiveTabGroupList />
        </Collapse>
      </List>
    </Paper>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <PopupMenu />
  </React.StrictMode>,
  document.getElementById("root") || document.createElement('div')
);
