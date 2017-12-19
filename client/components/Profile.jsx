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
import ActionAccountCircle from 'material-ui/svg-icons/action/account-circle'
import CommunicationLocationOn from 'material-ui/svg-icons/communication/location-on'
import Dialog from 'material-ui/Dialog'
import Divider from 'material-ui/Divider'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import Subheader from 'material-ui/Subheader'
import TextField from 'material-ui/TextField'

/*** FUNCTIONS ***/
import { f } from '../../common/common.functions.js'

/*** MAIN ***/
export default class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = { open: false, pwErr: false, userErr: false }
    this.submitPasswordUpdate = this.submitPasswordUpdate.bind(this)
    this.submitProfileUpdate = this.submitProfileUpdate.bind(this)
  }

  submitPasswordUpdate(loggedUser) {
    const password1 = document.getElementById('password1').value
    const password2 = document.getElementById('password2').value

    const bothPasswords = {
      currentPassword: password1,
      newPassword: password2
    }

    const data = encodeURIComponent(JSON.stringify(bothPasswords))
    if (DEV) {
      console.log('Sending current and new passwords:', data)
    }
    f('POST', '/api/' + loggedUser + '/update-password/' + data, response => {
      //Clear fields
      document.getElementById('password1').value = ''
      document.getElementById('password2').value = ''
      if (DEV) {
        console.log(response)
      }
      //Force re-login or error handling
      if (response === 'Password successfully changed.') {
        this.setState({ open: true })
      } else if (response === 'There was a problem changing your password. Please try again.') {
        this.setState({ pwErr: true })
      }
    })
  }
  submitProfileUpdate(loggedLocation, loggedUser) {
    const username = document.getElementById('username').value
    const location = document.getElementById('location').value
    const update = { username: username, location: location }
    const data = encodeURIComponent(JSON.stringify(update))
    f('POST', '/api/' + loggedUser + '/update-profile/' + data, response => {
      //Clear fields
      document.getElementById('username').value = ''
      document.getElementById('location').value = ''
      if (DEV) {
        console.log(response)
      }
      //Force re-login or error handling
      if (response === 'Successfully updated username and associated book ownership.') {
        this.setState({ open: true })
      } else if (
        response === 'A user by this name already exists. Please try a different username.'
      ) {
        this.setState({ userErr: true })
      }
    })
  }
  render() {
    const { loggedLocation, loggedUser } = this.props
    const { open, pwErr, userErr } = this.state

    //User will log out after changing location or password
    const logoutBtn = (
      <FlatButton
        href="/logout"
        label="Logout"
        primary={true}
        onClick={() => {
          this.setState({ open: false })
        }}
      />
    )
    const logoutDialog = (
      <Dialog
        actions={logoutBtn}
        modal={true}
        open={open}
        title="Your infomation was successfully updated"
      >
        You will now be logged out. Please log in with your new credentials.
      </Dialog>
    )

    return (
      <span>
        <h2>Update your profile</h2>
        <div className="infoBox">
          <h4>
            <ActionAccountCircle /> {loggedUser}
          </h4>
          <h4>
            <CommunicationLocationOn /> {loggedLocation}
          </h4>
        </div>
        <Divider />
        {logoutDialog}
        <div className="formBox">
          <form>
            <Subheader>Personal details</Subheader>
            {/* Change username TextField with error handling */}
            <TextField
              floatingLabelText="Username"
              fullWidth={true}
              hintText="Your username will be public."
              errorText={userErr ? 'That username is already taken. Please choose another.' : ''}
              id="username"
            />
            <br />
            <TextField
              floatingLabelText="Location"
              fullWidth={true}
              hintText="City and state or province"
              id="location"
            />
            <br />
            <RaisedButton
              buttonStyle={{ width: '100%' }}
              className="RaisedButtonProfile"
              label="Save Changes"
              onClick={() => {
                this.submitProfileUpdate(loggedUser, loggedLocation)
              }}
              primary={true}
            />
          </form>
        </div>
        <br />
        <br />
        <Divider />
        <div className="formBox">
          <form>
            <Subheader>Change your password</Subheader>
            <TextField
              errorText={pwErr ? ' ' : ''}
              floatingLabelText="Current Password"
              fullWidth={true}
              hintText="Use 12-72 letters and numbers."
              id="password1"
              type="password"
            />
            <br />
            <TextField
              errorText={pwErr ? 'Something went wrong. Please try again.' : ''}
              floatingLabelText="New Password"
              fullWidth={true}
              hintText="Use 12-72 letters and numbers."
              id="password2"
              type="password"
            />
            <br />
            <RaisedButton
              label="Save Changes"
              primary={true}
              className="RaisedButtonProfile"
              onClick={() => {
                this.submitPasswordUpdate(loggedUser)
              }}
            />
          </form>
        </div>
      </span>
    )
  }
}
