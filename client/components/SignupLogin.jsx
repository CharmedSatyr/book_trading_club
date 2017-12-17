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

/*** MAIN ***/
export default class SignupLoginPage extends Component {
  constructor(props) {
    super(props)
    this.state = { signup: false, login: false }
    this.loginClick = this.loginClick.bind(this)
    this.signupClick = this.signupClick.bind(this)
  }
  signupClick() {
    this.setState({ login: false, signup: true })
  }
  loginClick() {
    this.setState({ login: true, signup: false })
  }
  render() {
    const style = {
      marginTop: 120,
      paddingTop: 120
    }
    //Sign Up button
    const signupButton = <FlatButton label="Sign up" onClick={this.signupClick} />
    //Popup on clicking Sign Up button
    const signupModal = (
      <form action="/api/users" method="post">
        <TextField
          hintText="Your username will be public."
          floatingLabelText="Username"
          type="text"
          name="username"
          id="username"
        />
        <br />
        <TextField
          hintText="Use 12-72 letters and numbers."
          floatingLabelText="Password"
          type="password"
          name="password"
          id="password"
        />
        <br />
        <TextField
          hintText="Where do you want to swap books?"
          floatingLabelText="Location"
          type="text"
          name="location"
          id="location"
        />
        <br />
        <br />
        <RaisedButton label="Sign Up" primary={true} type="submit" />
        <RaisedButton label="Cancel" secondary={true} type="cancel" />
      </form>
    )

    //Login button
    const loginButton = <FlatButton label="Login" onClick={this.loginClick} />
    //Popup on clicking Login button
    const loginModal = (
      <form action="/welcome" method="post">
        <TextField
          hintText="Your username will be public."
          floatingLabelText="Username"
          type="text"
          name="username"
          id="username"
        />
        <br />
        <TextField
          hintText="Use 12-72 letters and numbers."
          floatingLabelText="Password"
          type="password"
          name="password"
          id="password"
        />
        <br />
        <br />
        <RaisedButton label="Login" primary={true} type="submit" />
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
