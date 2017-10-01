import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import './index.css'
import 'intersection-observer'

const rootDOM = document.querySelector('#root')

ReactDOM.hydrate(
    <AppContainer>
        <App />
    </AppContainer>,
    rootDOM
)
registerServiceWorker()

if (module.hot) {
    module.hot.accept('./App', () => {
        const NextApp = require('./App').default
        ReactDOM.hydrate(
            <AppContainer>
                <NextApp />
            </AppContainer>,
            rootDOM
        )
    })
}
