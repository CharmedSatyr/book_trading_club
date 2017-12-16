'use strict'

/*** COMPONENTS ***/
//React
import React from 'react'

//Material UI
import Badge from 'material-ui/Badge'
import IconButton from 'material-ui/IconButton'
import NotificationsIcon from 'material-ui/svg-icons/social/notifications'

//Styles
import { amber600, greenA700 } from 'material-ui/styles/colors'

/*** MAIN ***/
const RequestsBadge = ({ badgeContent, color, tooltip }) => {
  let badgeStyle = { right: 8, top: 19 }
  let secondary = false
  if (color === 'green') {
    badgeStyle.backgroundColor = greenA700
  } else if (color === 'yellow') {
    badgeStyle.backgroundColor = amber600
  } else {
    secondary = true
  }
  return <Badge badgeContent={badgeContent} badgeStyle={badgeStyle} secondary={secondary} />
}

export default RequestsBadge
