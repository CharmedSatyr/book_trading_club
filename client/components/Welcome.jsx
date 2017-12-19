'use strict'

/*** ENVIRONMENT ***/
import dotenv from 'dotenv'
dotenv.load()

/*** DEVELOPMENT TOOLS ***/
const DEV = process.env.NODE_ENV === 'development'
const PROD = process.env.NODE_ENV === 'production'

/*** COMPONENTS ***/
//React
import React, { Component } from 'react'

//Material UI
import AvLibraryBooks from 'material-ui/svg-icons/av/library-books'
import AppBar from 'material-ui/AppBar'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

/*** FUNCTIONS ***/
import { f } from '../../common/common.functions.js'

/*** STYLES ***/
const style = {
  marginTop: 120,
  paddingTop: 120
}

/*** MAIN ***/
export default class Welcome extends Component {
  constructor(props) {
    super(props)
    this.state = {
      locationErr: false,
      login: false,
      loginErr: false,
      pwErr: '',
      signup: false,
      userErr: ''
    }
    this.loginClick = this.loginClick.bind(this)
    this.signupClick = this.signupClick.bind(this)
    this.submitLogin = this.submitLogin.bind(this)
    this.submitSignup = this.submitSignup.bind(this)
  }
  loginClick() {
    this.setState({ login: true, signup: false })
  }
  signupClick() {
    this.setState({ login: false, signup: true })
  }
  submitLogin() {
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value
    const loginInfo = {
      username: username,
      password: password
    }
    //Basic client-side validation
    if (username === '' || password === '') {
      this.setState({ loginErr: true })
    } else {
      this.setState({ loginErr: false })
      //More easily configured server-side validation will take place before
      //the form is submitted to Passport. Passport.js documentation doesn't
      //discuss sending or receiving json responses
      const data = encodeURIComponent(JSON.stringify(loginInfo))
      if (DEV) {
        console.log('Validating login...')
      }
      f('POST', '/welcome/jsValidate/' + data, response => {
        if (DEV) {
          console.log(response)
        }
        if (response === 'OK') {
          this.setState({ loginErr: false })
          const loginForm = document.getElementById('loginForm')
          loginForm.submit()
        } else if (response === 'NO') {
          this.setState({ loginErr: true })
        }
      })
    }
  }
  submitSignup() {
    if (DEV) {
      console.log('submitSignup')
    }
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value
    const location = document.getElementById('location').value
    const signupInfo = {
      username: username
    }
    //Basic client-side validation
    if (!username) {
      this.setState({ userErr: 'Please enter a username.' })
    } else if (!password) {
      this.setState({ passErr: 'Please enter a password.', userErr: '' })
    } else if (!location) {
      this.setState({ locationErr: true, passErr: '' })
    } else if (username && password && location) {
      this.setState({ locationErr: '', passErr: '', userErr: '' })
      //More easily configured server-side validation will take place before
      //the form is submitted to Passport. Passport.js documentation doesn't
      //discuss sending or receiving json responses
      const data = encodeURIComponent(JSON.stringify(signupInfo))
      if (DEV) {
        console.log('Validating signup...')
      }
      f('POST', '/welcome/jsValidate/' + data, response => {
        if (DEV) {
          console.log(response)
        }
        if (response === 'OK') {
          if (DEV) {
            console.log('Submitting signupForm...')
          }
          const signupForm = document.getElementById('signupForm')
          signupForm.submit()
        } else if (response === 'NO') {
          this.setState({
            userErr: 'This username is already in use. Please choose another one.'
          })
        }
      })
    }
  }
  render() {
    //constants
    const { locationErr, loginErr, passErr, userErr } = this.state

    //Sign Up button
    const signupButton = <FlatButton label="Sign up" onClick={this.signupClick} />
    //Popup on clicking Sign Up button
    const signupModal = (
      <form action="/api/users" id="signupForm" method="post">
        <TextField
          errorText={userErr}
          hintText="Your username will be public."
          floatingLabelText="Username"
          fullWidth={true}
          type="text"
          name="username"
          id="username"
        />
        <br />
        <TextField
          errorText={passErr}
          hintText="Use 12-72 letters and numbers."
          floatingLabelText="Password"
          fullWidth={true}
          id="password"
          name="password"
          type="password"
        />
        <br />
        <TextField
          errorText={locationErr ? 'Please enter your location.' : ''}
          floatingLabelText="Location"
          fullWidth={true}
          hintText="Where do you want to swap books?"
          id="location"
          name="location"
          type="text"
        />
        <br />
        <br />
        <RaisedButton label="Sign Up" onClick={this.submitSignup} primary={true} />
        <RaisedButton label="Cancel" secondary={true} type="cancel" />
      </form>
    )

    //Login button
    const loginButton = <FlatButton label="Login" onClick={this.loginClick} />
    //Popup on clicking Login button
    const loginModal = (
      <form action="/welcome" id="loginForm" method="post">
        <TextField
          errorText={loginErr ? ' ' : ''}
          floatingLabelText="Username"
          fullWidth={true}
          hintText="Your username will be public."
          id="username"
          name="username"
          type="text"
        />
        <br />
        <TextField
          errorText={loginErr ? 'Something is wrong. Please retype your credentials.' : ''}
          floatingLabelText="Password"
          fullWidth={true}
          hintText="Use 12-72 letters and numbers."
          id="password"
          name="password"
          type="password"
        />
        <br />
        <br />
        <RaisedButton label="Login" onClick={this.submitLogin} primary={true} />
        <RaisedButton label="Cancel" secondary={true} type="cancel" />
      </form>
    )

    return (
      <div>
        <AppBar
          title="Charmed Books"
          iconElementLeft={<AvLibraryBooks className="AvLibraryBooks" />}
          iconElementRight={
            <div>
              {signupButton}
              {loginButton}
            </div>
          }
        />
        <Dialog title="Sign Up" modal={true} open={this.state.signup}>
          {signupModal}
        </Dialog>
        <Dialog title="Log In" modal={true} open={this.state.login}>
          {loginModal}
        </Dialog>
      </div>
    )
  }
}
