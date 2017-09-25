'use strict'

/*** COMPONENTS ***/
//React
import React from 'react'

//Material UI
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

/*** FUNCTIONS ***/
import { f } from '../../common/common.functions.js'

//Same submission function used for both login and signup
const userSubmit = route => {
  console.log('You signin up?')
  const username = document.getElementById('username').value
  const password = document.getElementById('password').value

  const user = {
    username: username,
    password: password
  }
  const userData = encodeURIComponent(JSON.stringify(user))

  f('POST', '/api/' + route + '/' + userData, response => {
    console.log(response)
  })
  document.getElementById('username').value = ''
  document.getElementById('password').value = ''
}

/*** MAIN ***/
const SignupLoginForm = ({ signup, login }) => {
  return (
    <div className="userpass">
      <h3 />
      <TextField
        hintText="Your username will be public."
        floatingLabelText="Username"
        id="username"
      />
      <br />
      <TextField
        hintText="Use 12-72 letters and numbers."
        floatingLabelText="Password"
        type="password"
        id="password"
      />
      <br />
      <br />
      {login ? (
        <RaisedButton
          label="Login"
          primary={true}
          style={{ margin: 12 }}
          onClick={() => {
            console.log('You loggin in?')
            userSubmit('login')
          }}
        />
      ) : (
        <span />
      )}
      {signup ? (
        <RaisedButton
          label="Sign Up"
          primary={true}
          style={{ margin: 12 }}
          onClick={() => {
            console.log('You signin up?')
            userSubmit('signup')
          }}
        />
      ) : (
        <span />
      )}
      <br />
    </div>
  )
}

export default SignupLoginForm
