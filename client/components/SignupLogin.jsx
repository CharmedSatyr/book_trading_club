'use strict'

/*** COMPONENTS ***/
//React
import React, { Component } from 'react'

//Material UI
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

/*** FUNCTIONS ***/
import { f } from '../../common/common.functions.js'

/*** MAIN ***/
export default class SignupLogin extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.userSubmit = this.userSubmit.bind(this)
  }
  userSubmit(route) {
    console.log('You signin up?')
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value
    const location = document.getElementById('location').value

    const user = {
      username: username,
      password: password,
      location: location
    }
    const userData = encodeURIComponent(JSON.stringify(user))

    f('POST', '/api/' + route + '/' + userData, response => {
      console.log(response)
    })
    document.getElementById('username').value = ''
    document.getElementById('password').value = ''
    document.getElementById('location').value = ''
  }
  render() {
    return (
      <div>
        <TextField
          hintText="Your username will be public."
          floatingLabelText="Username"
          id="username"
        />
        <TextField
          hintText="Use 6-72 characters of any type."
          floatingLabelText="Password"
          type="password"
          id="password"
        />
        <TextField
          hintText="Where would you like to trade?"
          floatingLabelText="Location"
          id="location"
        />
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
