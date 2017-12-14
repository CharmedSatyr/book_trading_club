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

/*** MAIN ***/
const NavBar = ({ addbooksfn, allbooksfn, loggedUser, mybooksfn, profilefn }) => {
  return (
    <div>
      <AppBar
        title="Charmed Books"
        iconElementLeft={<AvLibraryBooks className="AppBar" />}
        iconElementRight={
          <span>
            {window.innerWidth < 955 ? (
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
                  <MenuItem primaryText="Add Books" onClick={addbooksfn} />
                  <MenuItem primaryText="Your Books" onClick={mybooksfn} />
                  <MenuItem primaryText="Community Books" onClick={allbooksfn} />
                  <MenuItem primaryText="Profile" onClick={profilefn} />
                  <a href="/logout">
                    <MenuItem primaryText="Logout" className="MenuItem" />
                  </a>
                </IconMenu>
              </span>
            ) : (
              <span>
                <div className="welcomeName expanded">Welcome, {loggedUser}</div>
                <FlatButton label="Add Books" onClick={addbooksfn} className="navButtons" />
                <FlatButton label="Your Books" onClick={mybooksfn} className="navButtons" />
                <FlatButton label="Community Books" onClick={allbooksfn} className="navButtons" />
                <FlatButton label="Profile" onClick={profilefn} className="navButtons" />
                <a href="/logout">
                  <FlatButton label="Logout" className="navButtons" />
                </a>
              </span>
            )}
          </span>
        }
      />
    </div>
  )
}

export default NavBar
