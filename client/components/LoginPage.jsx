'use strict'

//React
import React, { Component } from 'react'

//Material UI
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
import AvLibraryBooks from 'material-ui/svg-icons/av/library-books'

//App
import SignupLoginForm from './SignupLoginForm.jsx'

//Button
const Login = ({ fn }) => {
  return (
    <span>
      <FlatButton label="Login" onClick={fn} style={{ marginTop: 7 }} />
    </span>
  )
}

//Main
export default class LoginPage extends Component {
  constructor(props) {
    super(props)
    this.state = { form: false }
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick() {
    this.setState({ form: true })
  }
  render() {
    return (
      <div>
        <div>
          <AppBar
            title="Charmed Books"
            iconElementLeft={<AvLibraryBooks style={{ marginTop: 12 }} />}
            iconElementRight={
              this.state.form ? <span /> : <Login fn={this.handleClick} />
            }
          />
        </div>
        {this.state.form === false ? (
          <h3>Log in to swap your favorite reads with people in your city.</h3>
        ) : (
          <SignupLoginForm />
        )}
      </div>
    )
  }
}
