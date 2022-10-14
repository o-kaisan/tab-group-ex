import MainMenu from "../components/MainMenus";

/**
 * タブグループ化(Chrome拡張機能)
 * ポップアップメニュ
 */

import ReactDOM from "react-dom";
import React, { useEffect, useState } from "react";


export default function PopupMenu() {
  return (
    <MainMenu />
  );
}

ReactDOM.render(
  <React.StrictMode>
    <PopupMenu />
  </React.StrictMode>,
  document.getElementById("root") || document.createElement('div')
);
