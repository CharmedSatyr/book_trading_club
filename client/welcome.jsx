import React from 'react'
import ReactDOM from 'react-dom'

import 'typeface-roboto'
import sass from './styles/styles.scss'
import SignupLoginPage from './components/SignupLogin.jsx'
import './img/favicon.ico'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

ReactDOM.render(
  <MuiThemeProvider>
    <SignupLoginPage />
  </MuiThemeProvider>,
  document.getElementById('welcome')
)
