'use strict'

/*** COMPONENTS ***/
//React
import React, { Component } from 'react'

//Material UI
import ActionSwapVerticalCircle from 'material-ui/svg-icons/action/swap-vertical-circle'
import Divider from 'material-ui/Divider'
import Subheader from 'material-ui/Subheader'

//App
import Library from './Library.jsx'

/*** MAIN ***/
const Community = ({ loggedUser, otherShelves, requestedBooks, requestor, snackBar }) => {
  //Other users' books that are available for swap
  //If the user requests them, the user is the requestor
  const available = (
    <Library
      location={otherShelves}
      loggedUser={loggedUser}
      requestor={loggedUser}
      snackBar={snackBar}
      whichButton="swap"
    />
  )

  //Books that have been requested by *anyone*, if request not yet evaluated
  const requested = <Library location={requestedBooks} loggedUser={loggedUser} />
  return (
    <span>
      <h2>Community Books</h2>
      <div className="infoBox">
        <h4>
          Click the <ActionSwapVerticalCircle />to request a swap!
        </h4>
      </div>
      <Divider />
      <Subheader>Requested</Subheader>
      {requestedBooks.length ? (
        requested
      ) : (
        <div className="infoBox">
          <h4>Nobody has requested any swaps...</h4>
        </div>
      )}
      <Divider />
      <Subheader>Available</Subheader>
      {otherShelves.length ? (
        available
      ) : (
        <div className="infoBox">
          <h4>Nothing to show here. Every book has been requested!</h4>
        </div>
      )}
    </span>
  )
}

export default Community
