'use strict'

/*** COMPONENTS ***/
//React
import React from 'react'

//Material UI
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
import AvLibraryBooks from 'material-ui/svg-icons/av/library-books'

/*** VARIABLES ***/
const style = {
  marginTop: 7
}

/*** MAIN ***/
const NavBar = ({ allbooksfn, mybooksfn, profilefn, logoutfn }) => {
  return (
    <div>
      <AppBar
        title="Charmed Books"
        iconElementLeft={<AvLibraryBooks style={{ marginTop: 12 }} />}
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
