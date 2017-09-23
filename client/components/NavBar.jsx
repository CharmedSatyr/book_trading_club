'use strict'

import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
import ActionHome from 'material-ui/svg-icons/action/home'

const Login = ({ fn }) => {
  return <FlatButton label="Login" onClick={fn} style={{ marginTop: 7 }} />
}

const Logged = ({ fn }) => {
  return (
    <div>
      <FlatButton label="urpoop" style={{ marginTop: 7 }} />
      <FlatButton label="mypoop" style={{ marginTop: 7 }} />
      <FlatButton label="Logout" onClick={fn} style={{ marginTop: 7 }} />
    </div>
  )
}

export default class NavBar extends Component {
  constructor(props) {
    super(props)
    this.state = { logged: true }
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick() {
    this.setState({ logged: !this.state.logged })
  }
  render() {
    return (
      <div>
        <AppBar
          title="Charmed Books"
          iconElementLeft={<ActionHome style={{ marginTop: 12 }} />}
          iconElementRight={
            this.state.logged ? (
              <Logged fn={this.handleClick} />
            ) : (
              <Login fn={this.handleClick} />
            )
          }
        />
      </div>
    )
  }
}
