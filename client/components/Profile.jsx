'use strict'

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
    this.state = { open: false }
  }
  render() {
    const { loggedLocation, loggedUser } = this.props
    const { open } = this.state

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
            <TextField
              fullWidth={true}
              hintText="Your username will be public."
              floatingLabelText="Username"
              id="username"
            />
            <br />
            <TextField
              fullWidth={true}
              hintText="City and state or province"
              floatingLabelText="Location"
              id="location"
            />
            <br />
            <RaisedButton
              buttonStyle={{ width: '100%' }}
              className="RaisedButtonProfile"
              label="Save Changes"
              onClick={() => {
                console.log('Click...')
                const username = document.getElementById('username').value
                const location = document.getElementById('location').value
                const update = { username: username, location: location }
                const data = encodeURIComponent(JSON.stringify(update))
                f('POST', '/api/' + loggedUser + '/update-profile/' + data, response => {
                  console.log(response)
                  if (response === 'Successfully updated username and associated book ownership.') {
                    this.setState({ open: true })
                  }
                })
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
              fullWidth={true}
              hintText="Use 12-72 letters and numbers."
              floatingLabelText="Current Password"
              type="password"
              id="password1"
            />
            <br />
            <TextField
              fullWidth={true}
              hintText="Use 12-72 letters and numbers."
              floatingLabelText="New Password"
              type="password"
              id="password2"
            />
            <br />
            <RaisedButton
              label="Save Changes"
              primary={true}
              className="RaisedButtonProfile"
              onClick={() => {
                const password1 = document.getElementById('password1').value
                const password2 = document.getElementById('password2').value

                const bothPasswords = {
                  currentPassword: password1,
                  newPassword: password2
                }

                const data = encodeURIComponent(JSON.stringify(bothPasswords))
                console.log('Sending current and new passwords:', data)
                f('POST', '/api/' + loggedUser + '/update-password/' + data, response => {
                  console.log(response)
                  if (response === 'Password successfully changed.') {
                    this.setState({ open: true })
                  }
                })
              }}
            />
          </form>
        </div>
      </span>
    )
  }
}
