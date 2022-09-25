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
import {getAllTabGroupList, groupAllActivateTabs, toggleTabGroupCollapsed, ungroupAllTabs} from "../utils/tabGroups"
import { Collapse, IconButton, ListItem, ListItemButton, ListSubheader, Tooltip } from "@mui/material";
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import ReportIcon from '@mui/icons-material/Report';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export interface SavedTabGroup {
  // タブグループのId
  // もしかすると保存するのにタブグループIDだけで足りないかも
  // 容量が大きすぎる場合は、機能を消すかも
  // タブグループのID
  id: number
  // タブグループのタイトル
  tabGroupTitle: string
  // タブグループに保存されているタブ
  tabList: chrome.tabs.Tab[]
}

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

  // グループタブ一覧の状態管理
  const [open, setOpen] = React.useState(true);
  // タブグループの一覧
  const [data, setData] = useState<chrome.tabGroups.TabGroup[] | undefined>();
  // 保存したタブグループ一覧
  const [savedTabGroups, setSavedTabGroups] = useState<SavedTabGroup[]>();

  useEffect(() => {
    updatedTabGroupList();
  }, []);

  const runGroupAllActiveTabs = () => {
    /*
     * アクティブなウィンドウのタブを全てグループ化
     */
    setOpen(false)
    groupAllActivateTabs();
    updatedTabGroupList();
  }

  const runUnGroupTabs = () => {
    /*
     * アクティブなウィンドウのタブグループを全て解除
     */
    setOpen(false)
    ungroupAllTabs();
    updatedTabGroupList();
  }

  const runShowTabGroupList = () => {
    /*
     * タブグループを一覧表示
     */
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

  const isSavedTabGroup = (tabGroupId: number) => {
    var ret = false
    savedTabGroups?.map(tabGroup => tabGroup.id === tabGroupId ? ret = true : ret)
    return ret
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
            <ListItemText>No Groups...</ListItemText>
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
            <IconButton>
              {isSavedTabGroup(tabGroup.id) ? <FavoriteIcon />: <FavoriteBorderIcon />}
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
          <ListItemButton onClick={runShowTabGroupList}>
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
