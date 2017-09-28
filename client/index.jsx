import 'babel-polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

//Used by Material UI for screen tap events
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

//import 'typeface-roboto'
import sass from './styles/styles.scss'
import App from './components/App.jsx'
import './img/favicon.ico'

ReactDOM.render(
  <MuiThemeProvider>
    <App />
  </MuiThemeProvider>,
  document.getElementById('app')
)
