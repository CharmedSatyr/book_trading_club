'use strict'

/*** COMPONENTS ***/
//React
import React from 'react'

//Material UI
import AppBar from 'material-ui/AppBar'
import AvLibraryBooks from 'material-ui/svg-icons/av/library-books'
import FlatButton from 'material-ui/FlatButton'

/*** MAIN ***/
const NavBar = ({ loggedUser }) => {
  return (
    <header>
      <AppBar
        title="Charmed Books"
        iconElementLeft={<AvLibraryBooks className="AppBar" />}
        iconElementRight={
          <span>
            <div className="welcomeName">Welcome, {loggedUser}</div>
            <a href="/logout">
              <FlatButton label="Logout" className="navButtons" />
            </a>
          </span>
        }
      />
    </header>
  )
}

export default NavBar
