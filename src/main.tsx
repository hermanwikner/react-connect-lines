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

// import {studioTheme, ThemeProvider} from '@sanity/ui'
// import React from 'react'
// import './index.css'
// import {createRoot} from 'react-dom/client'
// import App from './App'
// import {ConnectProvider} from './connect-lines'

// const container = document.getElementById('root')
// const root = createRoot(container!)

// root.render(
//   <React.StrictMode>
//     <ThemeProvider theme={studioTheme}>
//       <ConnectProvider>
//         <App />
//       </ConnectProvider>
//     </ThemeProvider>
//   </React.StrictMode>
// )
