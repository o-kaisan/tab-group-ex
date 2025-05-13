import ReactDOM from 'react-dom'
import React from 'react'
import { RecoilRoot } from 'recoil';
import TabNavigator from '../template/TabNavigator'

ReactDOM.render(
    <React.StrictMode>
        <RecoilRoot>
            <TabNavigator />
        </RecoilRoot>
    </React.StrictMode>,
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions, @typescript-eslint/prefer-nullish-coalescing
    document.getElementById('root') || document.createElement('div')
)
