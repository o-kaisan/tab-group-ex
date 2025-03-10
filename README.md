# Tab-Group-Ex

An extension for managing tab groups.

## Features
* Group tabs together
   * Modes can be selected from "SETTINGS":
       * All (Default): Groups all ungrouped tabs into a single group
         * Shortcut keys：ctrl+shift+1(Default)
       * Domain: Groups tabs by domain
         * Shortcut keys：ctrl+shift+2(Default)
       * Custom Domain: Groups tabs by specified domains (ignoring subdomains)
         * Shortcut keys：ctrl+shift+3(Default)
* Ungroup all tabs
  * Shortcut keys : Not set(Default)
* Display a list of groups
   * Displays a list of tab groups in the current browser
   * Clicking on a group name shows the list of URLs in that group
   * Right-clicking on a group name toggles the tab group open or closed.
   * Clicking the group settings icon opens a menu:
       * Close: Closes the group
       * Ungroup: Ungroups the group
* Save tab groups
* Display saved groups
   * Clicking on a group name shows the list of URLs in that group
   * Groups can be restored as a whole or by individual URLs


## Custom Domain
To group tabs by custom domains, open the "Rule" tab and add domains.

Example:
https://chrome.google.com/ → google
https://www.google.com/ → google

※ After modifying settings, save them by clicking "SAVE RULES".
※ Subdomains are ignored, so they will be treated as part of the main domain.


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
