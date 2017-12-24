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
import { clearInput, errMessage, userVal, passVal, locVal } from '../controllers/validate.client.js'

/*** MAIN ***/
export default class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      deleteOpen: false,
      locErr: '',
      logoutOpen: false,
      passErr: '',
      userErr: ''
    }
    this.deleteUser = this.deleteUser.bind(this)
    this.submitPasswordUpdate = this.submitPasswordUpdate.bind(this)
    this.submitProfileUpdate = this.submitProfileUpdate.bind(this)
  }
  deleteUser(loggedUser) {
    //This will delete the user and all associated books and requests
    this.setState({ deleteOpen: false })
    f('DELETE', '/api/deleteUser/' + loggedUser, response => {
      console.log(response)
    })
  }
  submitPasswordUpdate(loggedUser) {
    const password = document.getElementById('password').value
    const passwordN = document.getElementById('passwordN').value

    //Validate new password input and set error messages in state
    this.setState({ passErr: errMessage('pass', passVal(passwordN)) }, () => {
      clearInput(this.state)
    })

    //If the new password passes validation
    if (passVal(passwordN)) {
      const bothPasswords = {
        currentPassword: password,
        newPassword: passwordN
      }
      const data = encodeURIComponent(JSON.stringify(bothPasswords))
      if (DEV) {
        console.log('POSTing current and new passwords:', data)
      }
      f('POST', '/api/' + loggedUser + '/update-password/' + data, response => {
        if (DEV) {
          console.log(response)
        }
        //Force re-login or error handling
        if (response === 'OK') {
          this.setState({ logoutOpen: true })
        } else if (response === 'NO') {
          this.setState({ passErr: 'Something went wrong. Please try again.' }, () => {
            clearInput(this.state)
          })
        }
      })
    }
  }
  submitProfileUpdate(loggedUser, loggedLocation) {
    const username = document.getElementById('username').value
    const location = document.getElementById('location').value

    //Basic client-side validation (see Welcome.jsx)
    this.setState(
      {
        locErr: errMessage('loc', locVal(location)),
        userErr: errMessage('user', userVal(username))
      },
      () => {
        //Clean any fields that contain an error
        clearInput(this.state)
      }
    )

    //Submit to server if client-side passes
    if (
      (!location && userVal(username)) ||
      (!username && locVal(location)) ||
      (locVal(location) && userVal(username))
    ) {
      //Clear both errors if user or loc passes
      this.setState({ locErr: '', userErr: '' })

      //POST updates to server
      const update = { location: location, username: username }
      const data = encodeURIComponent(JSON.stringify(update))
      f('POST', '/api/' + loggedUser + '/update-profile/' + data, response => {
        if (DEV) {
          console.log('Posting update...')
          console.log(response)
        }
        //Force re-login on success
        if (response === 'OK') {
          this.setState({ logoutOpen: true })
          //error handling for duplicate username
          //location error handling not implemented; unclear need
        } else if (response === 'NO') {
          this.setState(
            { userErr: 'This username is already in use. Please choose another one.' },
            () => {
              //clear field
              clearInput(this.state)
            }
          )
        }
      })
    }
  }
  render() {
    const { loggedLocation, loggedUser } = this.props
    const { deleteOpen, locErr, logoutOpen, passErr, userErr } = this.state

    const deleteBtn = (
      <RaisedButton
        label="I'm sure"
        onClick={() => {
          this.deleteUser(loggedUser)
          window.location = '/logout'
        }}
        primary={true}
      />
    )
    const cancelDelete = (
      <RaisedButton
        className="rightBtn"
        label="Cancel"
        onClick={() => {
          this.setState({ deleteOpen: false })
        }}
        secondary={true}
      />
    )
    const deleteDialog = (
      <Dialog
        actions={[deleteBtn, cancelDelete]}
        modal={true}
        open={deleteOpen}
        title="Are you sure you want to delete your account?"
      >
        This will delete your account and all associated books and requests. You will need to create
        a new account to log in again.
      </Dialog>
    )

    //User will log out after changing location or password
    const logoutBtn = (
      <RaisedButton
        href="/logout"
        label="Logout"
        onClick={() => {
          this.setState({ logoutOpen: false })
        }}
        primary={true}
      />
    )
    const logoutDialog = (
      <Dialog
        actions={logoutBtn}
        modal={true}
        open={logoutOpen}
        title="Your infomation was successfully updated"
      >
        You will now be logged out. Please log in with your new credentials.
      </Dialog>
    )

    return (
      <span>
        {deleteDialog}
        {logoutDialog}
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
        <div className="formBox">
          <form>
            <Subheader>Personal details</Subheader>
            {/* Change username TextField with error handling */}
            <TextField
              errorText={userErr}
              floatingLabelText="Update your username"
              fullWidth={true}
              hintText="Your username will be public."
              id="username"
            />
            <br />
            <TextField
              errorText={locErr}
              floatingLabelText="Location"
              fullWidth={true}
              hintText="City and state or province"
              id="location"
            />
            <br />
            <RaisedButton
              className="RaisedButtonProfile"
              fullWidth={true}
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
              errorText={passErr.length > 0 ? ' ' : ''}
              floatingLabelText="Current Password"
              fullWidth={true}
              hintText="Use 12-72 letters and numbers."
              id="password"
              type="password"
            />
            <br />
            <TextField
              errorText={passErr}
              floatingLabelText="New Password"
              fullWidth={true}
              hintText="Use 12-72 letters and numbers."
              id="passwordN"
              type="password"
            />
            <br />
            <RaisedButton
              className="RaisedButtonProfile"
              fullWidth={true}
              label="Save Changes"
              onClick={() => {
                this.submitPasswordUpdate(loggedUser)
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
            <Subheader>Delete your account</Subheader>
            <RaisedButton
              className="RaisedButtonProfile"
              fullWidth={true}
              label="Delete"
              onClick={() => {
                this.setState({ deleteOpen: true })
              }}
              secondary={true}
            />
          </form>
        </div>
      </span>
    )
  }
}
