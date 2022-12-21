# Tab Group Ex
タブをグループ化するChromeの拡張機能

## Features
- タブのグループ化
   - 全てのタブをグループ化(デフォルト)
   - ドメインごとにグループ化
   - カスタム設定
     - 任意のドメインルールを作成可
     - ルール以外をグループ化 するかの設定
- タブグループの保存
  - 保存したタブグループの削除
  - 保存したタブグループの復元
- ウィンドウのタブグループの一覧表示
  - タブグループの開閉
  - 名前の変更
  - 閉じる
  - タブグループの解除

## Prerequisites

* [node + npm](https://nodejs.org/) (Current Version)

## Option

* [Visual Studio Code](https://code.visualstudio.com/)

## Includes the following

* TypeScript
* Webpack
* React
* Jest
* Example Code
    * Chrome Storage
    * Options Version 2
    * content script
    * count up badge number
    * background

## Project Structure

* src/typescript: TypeScript source files
* src/assets: static files
* dist: Chrome Extension directory
* dist/js: Generated JavaScript files

## Setup

```
npm install
```

## Import as Visual Studio Code project

...

## Build

```
npm run build
```

## Build in watch mode

### terminal

```
npm run watch
```

### Visual Studio Code

Run watch mode.

type `Ctrl + Shift + B`

## Load extension to chrome

Load `dist` directory

## Test
`npx jest` or `npm run test`
