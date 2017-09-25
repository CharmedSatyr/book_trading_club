'use strict'

/*** COMPONENTS ***/
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

const Signup = ({ signupfn }) => {
  return (
    <span>
      <FlatButton
        label="Sign up"
        onClick={signupfn}
        style={{ color: '#ffffff', marginTop: 7 }}
      />
    </span>
  )
}

const Home = ({ homefn }) => {
  return (
    <span>
      <FlatButton label="Home" onClick={homefn} style={{ marginTop: 7 }} />
    </span>
  )
}

/*** MAIN ***/
export default class SignupLoginPage extends Component {
  constructor(props) {
    super(props)
    this.state = { form: false, signup: false, login: false }
    this.homeClick = this.homeClick.bind(this)
    this.loginClick = this.loginClick.bind(this)
    this.signupClick = this.signupClick.bind(this)
  }
  loginClick() {
    this.setState({ form: true, login: true, signup: false })
  }
  homeClick() {
    this.setState({ form: false, login: false, signup: false })
  }
  signupClick() {
    this.setState({ form: true, login: false, signup: true })
  }
  render() {
    return (
      <div>
        <div>
          <AppBar
            title="Charmed Books"
            iconElementLeft={<AvLibraryBooks style={{ marginTop: 12 }} />}
            iconElementRight={
              this.state.form ? (
                <Home
                  homefn={() => {
                    this.homeClick()
                  }}
                />
              ) : (
                <div>
                  <Signup
                    signupfn={() => {
                      this.signupClick()
                    }}
                  />
                  <Login
                    fn={() => {
                      this.loginClick()
                    }}
                  />
                </div>
              )
            }
          />
        </div>
        {this.state.form ? (
          <SignupLoginForm
            login={this.state.login}
            signup={this.state.signup}
          />
        ) : (
          <h3>Log in to swap your favorite reads with people in your city.</h3>
        )}
      </div>
    )
  }
}
