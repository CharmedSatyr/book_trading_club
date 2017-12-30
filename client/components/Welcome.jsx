'use strict'

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
import { clearInput, errMessage, userVal, passVal, locVal } from '../controllers/validate.client.js'

/*** RESOURCES ***/
import book from '../img/art-book-drawing-illustration-Favim.com-729779.jpg'
//import book from '../img/single-book.jpg'
//import book from '../img/images.duckduckgo.com.png'

/*** MAIN ***/
export default class Welcome extends Component {
  constructor(props) {
    super(props)
    this.state = {
      locErr: '',
      loginOpen: false,
      loginErr: false,
      passErr: '',
      signupOpen: false,
      userErr: ''
    }
    this.cancel = this.cancel.bind(this)
    this.loginClick = this.loginClick.bind(this)
    this.signupClick = this.signupClick.bind(this)
    this.submitLogin = this.submitLogin.bind(this)
    this.submitSignup = this.submitSignup.bind(this)
  }
  cancel() {
    this.setState({ loginOpen: false, signupOpen: false }, () => clearInput(this.state))
  }
  loginClick() {
    this.setState({ loginOpen: true, signupOpen: false })
  }
  signupClick() {
    this.setState({ loginOpen: false, signupOpen: true })
  }
  submitLogin() {
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value

    //Basic client-side validation
    if (userVal(username) && passVal(password)) {
      //More easily configured server-side validation will take place before
      //the form is submitted to Passport. Passport.js documentation doesn't
      //discuss sending or receiving json responses
      const loginInfo = {
        username: username,
        password: password
      }
      const data = encodeURIComponent(JSON.stringify(loginInfo))
      //Check login info on server side
      f('POST', '/welcome/jsValidate/' + data, response => {
        //Submit form if valid login and password
        if (response === 'OK') {
          this.setState({ loginErr: false })
          const loginForm = document.getElementById('loginForm')
          loginForm.submit()
          //Otherwise something's wrong
          //For example, the username does not exist or the password is wrong
        } else if (response === 'NO') {
          this.setState({ loginErr: true }, () =>
            //Clear input
            clearInput(this.state)
          )
        }
      })
    } else {
      //If the username and password don't pass client side validation,
      //show an error and clear fields
      this.setState(
        {
          loginErr: true
        },
        () => clearInput(this.state)
      )
    }
  }
  submitSignup() {
    const location = document.getElementById('location').value
    const password = document.getElementById('password').value
    const username = document.getElementById('username').value

    //Validate input and set error messages in state
    this.setState(
      {
        locErr: errMessage('loc', locVal(location)),
        passErr: errMessage('pass', passVal(password)),
        userErr: errMessage('user', userVal(username))
      },
      () =>
        //Clear any fields that contain an error
        clearInput(this.state)
    )
    //If all fields are valid
    if (locVal(location) && passVal(password) && userVal(username)) {
      //check server side for username duplicate (route takes object because
      //it's also used for login validation in login function)
      const signupInfo = { username: username }
      const data = encodeURIComponent(JSON.stringify(signupInfo))
      f('POST', '/welcome/jsValidate/' + data, response => {
        //If there is no existing user using this username
        if (response === 'OK') {
          //Submit the form to go through passport authentication
          //and be added to the database
          const signupForm = document.getElementById('signupForm')
          signupForm.submit()
          //else if there *is* an existing user using this username
        } else if (response === 'NO') {
          //set err
          this.setState(
            {
              userErr: 'This username is already in use. Please choose another one.'
            },
            () =>
              //clear field
              clearInput(this.state)
          )
        }
      })
    }
  }
  render() {
    //constants
    const { locErr, loginOpen, loginErr, passErr, signupOpen, userErr } = this.state

    //Login button
    const loginButton = (
      <FlatButton className="navButtons" label="Login" onClick={this.loginClick} />
    )
    //This goes inside the loginDialog
    //that becomes visible on clicking //the Login button
    const loginForm = (
      <form action="/welcome" id="loginForm" method="post">
        <TextField
          errorText={loginErr ? ' ' : ''}
          floatingLabelText="Username"
          fullWidth={true}
          hintText=""
          id="username"
          name="username"
          type="text"
        />
        <br />
        <TextField
          errorText={loginErr ? 'Something is wrong. Please retype your credentials.' : ''}
          floatingLabelText="Password"
          fullWidth={true}
          hintText=""
          id="password"
          name="password"
          type="password"
        />
        <br />
        <br />
        <RaisedButton label="Login" onClick={this.submitLogin} primary={true} />
        <RaisedButton className="rightBtn" label="Cancel" onClick={this.cancel} secondary={true} />
      </form>
    )

    //Sign Up button
    const signupButton = (
      <FlatButton className="navButtons" label="Sign up" onClick={this.signupClick} />
    )
    //This goes inside the signupDialog
    //that becomes visible on clicking //the Sign Up button
    const signupForm = (
      <form action="/api/users" id="signupForm" method="post">
        <TextField
          errorText={userErr}
          floatingLabelText="Choose your username"
          fullWidth={true}
          hintText="Your username will be public."
          id="username"
          name="username"
          type="text"
        />
        <br />
        <TextField
          errorText={passErr}
          floatingLabelText="Create a password"
          fullWidth={true}
          hintText="Use at least 8 letters, numbers, and special characters."
          id="password"
          name="password"
          type="password"
        />
        <br />
        <TextField
          errorText={locErr}
          floatingLabelText="Location"
          fullWidth={true}
          hintText="City and state or province"
          id="location"
          name="location"
          type="text"
        />
        <br />
        <br />
        <RaisedButton label="Sign Up" onClick={this.submitSignup} primary={true} />
        <RaisedButton className="rightBtn" label="Cancel" onClick={this.cancel} secondary={true} />
      </form>
    )

    return (
      <div>
        <AppBar
          title="Charmed Books"
          iconElementLeft={<AvLibraryBooks className="bookIcon" />}
          iconElementRight={
            <div>
              {loginButton}
              {signupButton}
            </div>
          }
        />
        <Dialog title="Sign Up" modal={true} open={signupOpen}>
          {signupForm}
        </Dialog>
        <Dialog title="Log In" modal={true} open={loginOpen}>
          {loginForm}
        </Dialog>
        <main className="welcomeContent">
          <section className="welcomeChild">
            <img alt="Read to Live, Live to Read" src={book} />
          </section>
          <section className="welcomeChild">
            <h2>
              Welcome to Charmed Books
              <h4>a book swapping app</h4>
            </h2>
            <ol>
              <li>Form a book club with your friends.</li>
              <li>Sign up for Charmed Books.</li>
              <li>Add the books you own to your collection.</li>
              <li>Request books and manage swaps with your community!</li>
            </ol>
          </section>
        </main>
      </div>
    )
  }
}
