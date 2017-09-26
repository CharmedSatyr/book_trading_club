'use strict'

/*** COMPONENTS ***/
//React
import React from 'react'

//Material UI
import AppBar from 'material-ui/AppBar'
import AvLibraryBooks from 'material-ui/svg-icons/av/library-books'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'

/*** VARIABLES ***/
const style = {
  marginTop: 7,
  textDecoration: 'none'
}

/*** MAIN ***/
const NavBar = ({ allbooksfn, mybooksfn, profilefn, loggedUser }) => {
  return (
    <div>
      <AppBar
        title="Charmed Books"
        iconElementLeft={<AvLibraryBooks style={{ marginTop: 12 }} />}
        iconElementRight={
          <span>
            <div className="welcomeName">Welcome, {loggedUser}</div>
            <IconMenu
              iconButtonElement={
                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              }
              targetOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
            >
              <MenuItem
                primaryText="All Books"
                onClick={allbooksfn}
                style={style}
              />
              <MenuItem
                primaryText="My Books"
                onClick={mybooksfn}
                style={style}
              />
              <MenuItem
                primaryText="Profile"
                onClick={profilefn}
                style={style}
              />
              <a href="/logout">
                <MenuItem primaryText="Logout" style={style} />
              </a>
            </IconMenu>
          </span>
        }
      />
    </div>
  )
}

export default NavBar
