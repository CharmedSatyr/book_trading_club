'use strict'

/*** COMPONENTS ***/
//React
import React, { Component } from 'react'

//App
import NavBar from './NavBar.jsx'

//Material UI
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

/*** FUNCTIONS ***/
import { f } from '../../common/common.functions.js'

/*** MAIN ***/
export default class SignupLoginForm extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.userSubmit = this.userSubmit.bind(this)
  }
  userSubmit(route) {
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
  render() {
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
        <RaisedButton
          label="Sign Up"
          primary={true}
          style={{ margin: 12 }}
          onClick={() => {
            console.log('You signin up?')
            this.userSubmit('signup')
          }}
        />
        <RaisedButton
          label="Login"
          default={true}
          style={{ margin: 12 }}
          onClick={() => {
            console.log('You loggin in?')
            this.userSubmit('login')
          }}
        />
        <br />
      </div>
    )
  }
}
