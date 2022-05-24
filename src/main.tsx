import {studioTheme, ThemeProvider} from '@sanity/ui'
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import {ConnectProvider} from '../react-connect-lines'
import App from './App'

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
