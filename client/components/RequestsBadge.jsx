'use strict'

/*** COMPONENTS ***/
//React
import React from 'react'

//Material UI
import Badge from 'material-ui/Badge'
import IconButton from 'material-ui/IconButton'
import NotificationsIcon from 'material-ui/svg-icons/social/notifications'

/*** MAIN ***/
const RequestsBadge = ({ myRequests, requestsForMe }) => {
  return (
    <div>
      <Badge badgeContent={myRequests} primary={true} className="badgeStyle">
        <IconButton className="iconStyle" tooltip="Requests You've Made">
          <NotificationsIcon />
        </IconButton>
      </Badge>
      <Badge badgeContent={requestsForMe} secondary={true} className="badgeStyle">
        <IconButton className="iconStyle" tooltip="Requests for You">
          <NotificationsIcon />
        </IconButton>
      </Badge>
    </div>
  )
}

export default RequestsBadge
