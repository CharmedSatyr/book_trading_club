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
const BadgeExampleSimple = () => {
  return (
    <div>
      <Badge badgeContent={4} primary={true} badgeStyle={badgeStyles}>
        <IconButton
          tooltip="Your Outstanding Trade Requests"
          style={iconStyles}
        >
          <NotificationsIcon />
        </IconButton>
      </Badge>
      <Badge badgeContent={0} secondary={true} badgeStyle={badgeStyles}>
        <IconButton tooltip="Trade Requests for You" style={iconStyles}>
          <NotificationsIcon />
        </IconButton>
      </Badge>
    </div>
  )
}

export default BadgeExampleSimple
