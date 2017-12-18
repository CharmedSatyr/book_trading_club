//ES6 polyfill
import 'babel-polyfill'

//high-level libraries
import React from 'react'
import ReactDOM from 'react-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

//used by Material UI for screen tap events
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

//favicon
import './img/favicon.ico'

//font
import 'typeface-roboto'

//styles
import sass from './styles/styles.scss'

//main component
import Welcome from './components/Welcome.jsx'

//render
ReactDOM.render(
  <MuiThemeProvider>
    <Welcome />
  </MuiThemeProvider>,
  document.getElementById('welcome')
)
