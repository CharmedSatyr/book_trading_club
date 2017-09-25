import React from 'react'
import ReactDOM from 'react-dom'

import sass from './styles/styles.scss'
import SignupLoginPage from './components/SignupLoginPage.jsx'
import './img/favicon.ico'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

ReactDOM.render(
  <MuiThemeProvider>
    <SignupLoginPage />
  </MuiThemeProvider>,
  document.getElementById('login')
)
