'use strict'

/*** COMPONENTS ***/
//React
import React from 'react'

//Material UI
import Divider from 'material-ui/Divider'
import RaisedButton from 'material-ui/RaisedButton'
import Subheader from 'material-ui/Subheader'
import TextField from 'material-ui/TextField'

/*** FUNCTIONS ***/
import { f } from '../../common/common.functions.js'

/*** MAIN ***/
const Profile = ({ loggedUser }) => {
  return (
    <div>
      <Subheader>Update your profile</Subheader>
      <Divider />
      <form>
        <Subheader>Personal Details</Subheader>
        <TextField
          hintText="Your username will be public."
          floatingLabelText="Username"
          id="username"
        />
        <br />
        <TextField
          hintText="City and state or province"
          floatingLabelText="Location"
          id="location"
        />
        <br />
        <RaisedButton
          label="Save Changes"
          primary={true}
          className="RaisedButtonProfile"
          onClick={() => {
            const username = document.getElementById('username').value
            const location = document.getElementById('location').value
            const update = { username: username, location: location }
            const data = encodeURIComponent(JSON.stringify(update))

            f('POST', '/api/' + loggedUser + '/profile-update/' + data, response => {
              console.log(response)
            })
          }}
        />
      </form>
      <br />
      <br />
      <Divider />
      <form>
        <Subheader>Change your password</Subheader>
        <TextField
          hintText="Use 12-72 letters and numbers."
          floatingLabelText="Current Password"
          type="password"
          id="password1"
        />
        <br />
        <TextField
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
            })
          }}
        />
      </form>
      <br />
    </div>
  )
}
export default Profile
