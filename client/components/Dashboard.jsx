'use strict'

/*** COMPONENTS ***/
//React
import React from 'react'

//Material UI
import ActionDashboard from 'material-ui/svg-icons/action/dashboard'
import Divider from 'material-ui/Divider'
import RaisedButton from 'material-ui/RaisedButton'
import Subheader from 'material-ui/Subheader'
import TextField from 'material-ui/TextField'

//App
import Book from './Book.jsx'
import Library from './Library.jsx'
import RequestsBadge from './RequestsBadge.jsx'

/*** FUNCTIONS ***/
import { f } from '../../common/common.functions.js'

/*** MAIN ***/
const Dashboard = ({
  location,
  loggedUser,
  requestsForYou,
  snackApprove,
  snackCancel,
  snackDelete,
  snackDeny,
  yourRequests,
  yourShelves
}) => {
  return (
    <span>
      {/* USER LIBRARY */}
      <h2>Dashboard</h2>
      <div className="infoBox">
        <h4>
          <ActionDashboard />
          See requests you've made, requests from others, and the books you've made available to
          swap.
        </h4>
      </div>
      <Divider />

      {/* REQUESTS FOR USER */}
      {requestsForYou.length ? (
        <span>
          <Subheader>
            Someone wants to swap!
            <RequestsBadge badgeContent={requestsForYou.length} />
          </Subheader>
          <Library
            location={requestsForYou}
            loggedUser={loggedUser}
            snackApprove={snackApprove}
            snackDeny={snackDeny}
            whichButton="approveDeny"
          />
          <Divider />
        </span>
      ) : null}

      {/* USER'S REQUESTS */}
      {yourRequests.length ? (
        <span>
          <Subheader>
            Your book requests
            <RequestsBadge badgeContent={yourRequests.length} color="yellow" />
          </Subheader>
          <Library
            location={yourRequests}
            loggedUser={loggedUser}
            snackCancel={snackCancel}
            whichButton="cancel"
          />
          <Divider />
        </span>
      ) : null}
      {/* USER'S BOOKS */}
      <Subheader>
        Your books
        <RequestsBadge badgeContent={yourShelves.length} color="green" />
      </Subheader>
      {yourShelves.length ? (
        <Library location={yourShelves} snackDelete={snackDelete} whichButton="delete" />
      ) : (
        <div className="infoBox">
          <h4>Add some books to your collection!</h4>
        </div>
      )}
    </span>
  )
}

export default Dashboard
