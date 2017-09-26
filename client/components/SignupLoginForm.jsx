'use strict'

/*** COMPONENTS ***/
//React
import React from 'react'

//Material UI
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

/*** MAIN ***/
const SignupLoginForm = ({ signup, login }) => {
  return (
    <div>
      <div className="userpass">
        {login ? (
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
            <RaisedButton
              label="Login"
              primary={true}
              style={{ margin: 12 }}
              type="submit"
            />
          </form>
        ) : (
          <span />
        )}
        {signup ? (
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

            <RaisedButton
              label="Sign Up"
              primary={true}
              style={{ margin: 12 }}
              type="submit"
            />
          </form>
        ) : (
          <span />
        )}
        <br />
      </div>
    </div>
  )
}

export default SignupLoginForm
