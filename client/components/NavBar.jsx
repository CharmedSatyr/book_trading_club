'use strict'

import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
import ActionHome from 'material-ui/svg-icons/action/home'

const style = {
  marginTop: 7
}

const NavBar = ({ allbooksfn, mybooksfn, profilefn, logoutfn }) => {
  return (
    <div>
      <AppBar
        title="Charmed Books"
        iconElementLeft={<ActionHome style={{ marginTop: 12 }} />}
        iconElementRight={
          <span>
            <FlatButton label="All Books" onClick={allbooksfn} style={style} />
            <FlatButton label="My Books" onClick={mybooksfn} style={style} />
            <FlatButton label="Profile" onClick={profilefn} style={style} />
            <FlatButton label="Logout" onClick={logoutfn} style={style} />
          </span>
        }
      />
    </div>
  )
}

export default NavBar