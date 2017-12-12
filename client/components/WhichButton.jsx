'use strict'

/*** COMPONENTS ***/
//React
import React from 'react'

//Material UI
import IconButton from 'material-ui/IconButton'
import NavigationClose from 'material-ui/svg-icons/navigation/close'
import NavigationCheck from 'material-ui/svg-icons/navigation/check'
import ActionSwapVerticalCircle from 'material-ui/svg-icons/action/swap-vertical-circle'

//Styles
import { red500, yellow500, blue500, greenA700 } from 'material-ui/styles/colors'

const approveDenyStyle = {
  marginLeft: -10,
  marginRight: -10
}

/*** FUNCTIONS ***/
import { f } from '../../common/common.functions.js'

const WhichButton = ({ loggedUser, olkey, owner, requestor, whichButton }) => {
  if (whichButton === 'delete') {
    return (
      <div className="bookOverlay">
        <IconButton
          onClick={() => {
            const bookInfo = {
              olkey: olkey,
              owner: owner
            }
            const data = encodeURIComponent(JSON.stringify(bookInfo))
            f('DELETE', '/api/' + owner + '/save/' + data)
          }}
        >
          <NavigationClose color={red500} />
        </IconButton>
      </div>
    )
  } else if (whichButton === 'swap') {
    return (
      <div className="bookOverlay">
        <IconButton
          onClick={() => {
            const bookInfo = {
              olkey: olkey,
              owner: owner
            }
            const data = encodeURIComponent(JSON.stringify(bookInfo))
            f('POST', '/api/' + requestor + '/request/' + data)
            console.log('We should swap:', bookInfo)
          }}
        >
          <ActionSwapVerticalCircle />
        </IconButton>
      </div>
    )
  } else if (whichButton === 'approveDeny') {
    return (
      <div className="approveDeny">
        {/* APPROVE REQUEST */}
        <IconButton
          onClick={() => {
            const bookInfo = {
              olkey: olkey,
              owner: owner
            }
            const data = encodeURIComponent(JSON.stringify(bookInfo))
            f('POST', '/api/' + loggedUser + '/approveRequest/' + data, request => {
              console.log('Approve Request', request)
              alert(
                'You have approved a request! In a completed app, you would now be able to send a message via a simple app integration (e.g., https://agile-oasis-2124.herokuapp.com/) to the other user to coordinate the swap.'
              )
            })
          }}
          style={approveDenyStyle}
        >
          <NavigationCheck color={greenA700} />
        </IconButton>
        {/* DENY REQUEST */}
        <IconButton
          onClick={() => {
            const bookInfo = {
              olkey: olkey,
              owner: owner
            }
            const data = encodeURIComponent(JSON.stringify(bookInfo))
            f('POST', '/api/' + loggedUser + '/denyRequest/' + data, request => {
              console.log('Deny Request', request)
            })
          }}
          style={approveDenyStyle}
        >
          <NavigationClose color={red500} />
        </IconButton>
      </div>
    )
  } else if (whichButton === 'cancelRequest') {
    return (
      <div className="bookOverlay">
        <IconButton
          onClick={() => {
            const bookInfo = {
              olkey: olkey,
              owner: owner
            }
            const data = encodeURIComponent(JSON.stringify(bookInfo))
            f('POST', '/api/' + loggedUser + '/cancelRequest/' + data, response => {
              console.log(response)
            })
          }}
        >
          <NavigationClose color={red500} />
        </IconButton>
      </div>
    )
  } else {
    return null
  }
}

export default WhichButton
