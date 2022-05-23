import {studioTheme, ThemeProvider} from '@sanity/ui'
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import {ConnectProvider} from './connect-lines'

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={studioTheme}>
      <ConnectProvider>
        <App />
      </ConnectProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
