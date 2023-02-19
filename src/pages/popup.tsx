import BasicTabs from '../components/TabPanel'

/**
 * タブグループ化(Chrome拡張機能)
 * ポップアップメニュ
 */

import ReactDOM from 'react-dom'
import React from 'react'

export default function PopupMenu () {
  return <BasicTabs />
}

ReactDOM.render(
  <React.StrictMode>
    <PopupMenu />
  </React.StrictMode>,
  (document.getElementById('root') != null) || document.createElement('div')
)
