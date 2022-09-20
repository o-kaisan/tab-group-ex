/**
 * タブグループ化(Chrome拡張機能)
 * ポップアップメニュ
 *
 * ToDo: タブをドメインごとにグループ化
 * ToDo: タブルールを設定してグループ化
 */

import ReactDOM from "react-dom";
import React, { useEffect, useState } from "react";

import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import LayersIcon from '@mui/icons-material/Layers';
import LayersClearIcon from '@mui/icons-material/LayersClear';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import Cloud from '@mui/icons-material/Cloud';

import {groupAllActivateTabs, ungroupAllTabs} from "../utils/tabGroups"

/*
 * 拡張機能のメニュー
 */
export default function PopupMenu() {
  /*
   * ボタンデバッグ用
   */
  const handleClick = () => {
    alert("onClick");
  };

  const runGroupAllActiveTabs = () => {
    groupAllActivateTabs();
  }

  const runUnGroupTabs = () => {
    ungroupAllTabs();
  }

  return (
    <Paper sx={{ width: 320, maxWidth: '100%' }}>
      <MenuList>
        <MenuItem onClick={runGroupAllActiveTabs}>
          <ListItemIcon>
            <LayersIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>タブを全てグループ化</ListItemText>
          <Typography variant="body2" color="text.secondary">
            ⌘X
          </Typography>
        </MenuItem>
        <MenuItem onClick={runUnGroupTabs}>
          <ListItemIcon>
            <LayersClearIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>タブのグループ化を解除</ListItemText>
          <Typography variant="body2" color="text.secondary">
            ⌘C
          </Typography>
        </MenuItem>
        {/* <MenuItem onClick={handleClick}>
          <ListItemIcon>
            <BookmarksIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>グループをブックマーク</ListItemText>
          <Typography variant="body2" color="text.secondary">
            ⌘V
          </Typography>
        </MenuItem> */}
        {/* <MenuItem onClick={handleClick}>
          <ListItemIcon>
            <LibraryAddCheckIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>選択したタブをグループ化</ListItemText>
          <Typography variant="body2" color="text.secondary">
            ⌘V
          </Typography>
        </MenuItem> */}
        {/* <Divider /> */}
        {/* <MenuItem>
          <ListItemIcon>
            <Cloud fontSize="small" />
          </ListItemIcon>
          <ListItemText>xxxxxxx</ListItemText>
        </MenuItem> */}
      </MenuList>
    </Paper>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <PopupMenu />
  </React.StrictMode>,
  document.getElementById("root")
);
