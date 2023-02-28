import ReactDOM from 'react-dom'
import React from 'react'
import TabNavigator from '../templates/TabNavigator'

ReactDOM.render(
  <React.StrictMode>
    <TabNavigator />
  </React.StrictMode>,
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions, @typescript-eslint/prefer-nullish-coalescing
  document.getElementById('root') || document.createElement('div')
)
