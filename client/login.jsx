import React from 'react'
import ReactDOM from 'react-dom'

import sass from './styles/styles.scss'
import LoginPage from './components/LoginPage.jsx'
import './img/favicon.ico'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

ReactDOM.render(
  <MuiThemeProvider>
    <LoginPage />
  </MuiThemeProvider>,
  document.getElementById('login')
)
