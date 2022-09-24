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
import {getAllTabGroupList, groupAllActivateTabs, ungroupAllTabs} from "../utils/tabGroups"
import { Collapse, ListItemButton, ListSubheader } from "@mui/material";
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import ReportIcon from '@mui/icons-material/Report';

/*
 * 拡張機能のメニュー
 */
export default function PopupMenu() {
  // TODO: タブグループの一覧表示
  // TODO: タブグループの保存
  // TODO: タブグループの削除
  // TODO: タブグループ選択後に一括表示
  // TODO: タブグループの編集
  // TODO: ドメインごとにグループ化
  // TODO: 指定したルールで自動でタブをグループ化
  // TODO: アクティブなタブのグループのみグループ化解除

  // FIXME: 再レンダリングが終わってからリストが開けるようにする
  // FIXME: そもそもグループがないときはリストを開けないようにしたい
  //         →しばらくDisabledにするとか？

  // グループタブ一覧の状態管理
  const [open, setOpen] = React.useState(true);
  // タブグループの一覧
  const [data, setData] = useState<chrome.tabGroups.TabGroup[] | undefined>();

  useEffect(() => {
    updatedTabGroupList();
  }, []);

  useEffect(() =>{

  }, [open])

  const changedOpen = () => {
    /*
     * グループタブ一覧コンポーネントが更新された場合の挙動を管理
     */
    // 2秒くらいdisabledにしたらいいとかないかな？
  }

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
        setOpen(!open)
      }
    }).catch((error) => {
      console.log(error)
    })
  }

  const updatedTabGroupList = async () => {
    getAllTabGroupList().then((tabGroupList) => {
        setData(tabGroupList)
      }).catch((error) => {
        console.log(error)
      })
    }

  const updateCollapsedTabGroup = (tabGroupId: number) => {
    /*
     * タブグループの展開/集約を切り替える
     */

  }

  const SubList = () => {
      if (data == undefined) {
        return(
          <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
          <ReportIcon>
            <RocketLaunchIcon />
          </ReportIcon>
          <ListItemText>No Groups...</ListItemText>
          </ListItemButton>
          </List>
        );
      }
      return (
        <List component="div" disablePadding>
          {data.map((tabGroup) => (
            <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <RocketLaunchIcon />
            </ListItemIcon>
            <ListItemText>{tabGroup.title}</ListItemText>
            </ListItemButton>
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
        <ListItemButton onClick={runGroupAllActiveTabs}>
          <ListItemIcon>
            <LayersIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>タブを全てグループ化</ListItemText>
          <Typography variant="body2" color="text.secondary">
            ⌘X
          </Typography>
        </ListItemButton>
        <ListItemButton onClick={runUnGroupTabs}>
          <ListItemIcon>
            <LayersClearIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>タブのグループ化を解除</ListItemText>
          <Typography variant="body2" color="text.secondary">
            ⌘C
          </Typography>
        </ListItemButton>
        <Divider />
        <ListItemButton onClick={runShowTabGroupList}>
          <ListItemIcon>
            <WebStoriesIcon fontSize="small"/>
          </ListItemIcon>
          <ListItemText>タブグループ一覧</ListItemText>
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <SubList />
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
