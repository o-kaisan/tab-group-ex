import BasicTabs from '../components/TabPanel'

/**
 * タブグループ化(Chrome拡張機能)
 * ポップアップメニュ
 */

import ReactDOM from 'react-dom'
import React from 'react'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function PopupMenu() {
  return <BasicTabs />
}

ReactDOM.render(
  <React.StrictMode>
    <PopupMenu />
  </React.StrictMode>,
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions, @typescript-eslint/prefer-nullish-coalescing
  document.getElementById('root') || document.createElement('div')
)
