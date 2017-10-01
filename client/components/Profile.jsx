'use strict'

/*** COMPONENTS ***/
//React
import React from 'react'

//Material UI
import Divider from 'material-ui/Divider'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

/*** FUNCTIONS ***/
import { f } from '../../common/common.functions.js'

/*** VARIABLES ***/
const style = {
  margin: 5
}

/*** MAIN ***/
const Profile = ({ loggedUser }) => {
  return (
    <div>
      <h3>Update your profile</h3>
      <Divider />
      <h3>Personal Details</h3>
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
        style={style}
        onClick={() => {
          const username = document.getElementById('username').value
          const location = document.getElementById('location').value
          const update = { username: username, location: location }
          const data = encodeURIComponent(JSON.stringify(update))

          f(
            'POST',
            '/api/' + loggedUser + '/profile-update/' + data,
            response => {
              console.log(response)
            }
          )
        }}
      />
      <br />
      <br />
      <Divider />
      <h3>Change your password</h3>
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
        style={style}
        onClick={() => {
          const password1 = document.getElementById('password1').value
          const password2 = document.getElementById('password2').value

          let data
          if (password1 === password2) {
            data = encodeURIComponent(JSON.stringify(password1))
            console.log('Attempting to use password:', data)
            f(
              'POST',
              '/api/' + loggedUser + '/update-password/' + data,
              response => {
                console.log(response)
              }
            )
          } else {
            console.log('Your passwords do not match!')
          }
        }}
      />
      <br />
    </div>
  )
}
export default Profile
