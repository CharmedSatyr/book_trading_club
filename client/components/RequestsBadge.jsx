'use strict'

/*** COMPONENTS ***/
//React
import React from 'react'

//Material UI
import Badge from 'material-ui/Badge'
import IconButton from 'material-ui/IconButton'
import NotificationsIcon from 'material-ui/svg-icons/social/notifications'

/*** VARIABLES ***/
const iconStyles = {
  marginTop: -6
}

const badgeStyles = {
  top: 18,
  right: 22
}

/*** MAIN ***/
const RequestsBadge = ({ myRequests, requestsForMe }) => {
  return (
    <div>
      <Badge badgeContent={myRequests} primary={true} badgeStyle={badgeStyles}>
        <IconButton tooltip="Requests You've Made" style={iconStyles}>
          <NotificationsIcon />
        </IconButton>
      </Badge>
      <Badge
        badgeContent={requestsForMe}
        secondary={true}
        badgeStyle={badgeStyles}
      >
        <IconButton tooltip="Requests for You" style={iconStyles}>
          <NotificationsIcon />
        </IconButton>
      </Badge>
    </div>
  )
}

export default RequestsBadge
