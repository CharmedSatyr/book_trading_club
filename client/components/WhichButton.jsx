'use strict'

/*** COMPONENTS ***/
//React
import React from 'react'

//Material UI
import ActionSwapVerticalCircle from 'material-ui/svg-icons/action/swap-vertical-circle'
import ContentAdd from 'material-ui/svg-icons/content/add'
import IconButton from 'material-ui/IconButton'
import NavigationCheck from 'material-ui/svg-icons/navigation/check'
import NavigationClose from 'material-ui/svg-icons/navigation/close'

//Styles
import { red500, yellow500, blue500, greenA700 } from 'material-ui/styles/colors'

const approveDenyStyle = {
  marginLeft: -10,
  marginRight: -10
}

/*** FUNCTIONS ***/
import { f } from '../../common/common.functions.js'

/*** MAIN ***/
const WhichButton = ({
  author,
  cover,
  loggedUser,
  olkey,
  owner,
  publication,
  requestor,
  snackAdd,
  snackApprove,
  snackCancel,
  snackDelete,
  snackDeny,
  snackSwap,
  title,
  whichButton
}) => {
  //This is basic inforation about the book that is appears in Icon Button tooltips on hover.
  const reference = title + ' (' + publication + ') by ' + author

  //add button
  const add = (
    <span className="bookOverlay">
      <IconButton
        onClick={() => {
          const obj = {
            author: author,
            cover: cover,
            olkey: olkey,
            owner: loggedUser,
            publication: publication,
            title: title
          }
          const data = encodeURIComponent(JSON.stringify(obj))
          console.log('Saving ' + title + ' by ' + author)
          f('POST', '/api/' + loggedUser + '/save/' + data, response => console.log(response))
          snackAdd()
        }}
        tooltip={'Add ' + reference + ' to Your Books.'}
      >
        <ContentAdd color={greenA700} />
      </IconButton>
    </span>
  )

  //cancelRequest button
  const cancelRequest = (
    <span className="bookOverlay">
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
          snackCancel()
        }}
        tooltip={'Cancel your request for ' + reference + ' from ' + owner + '.'}
      >
        <NavigationClose color={red500} />
      </IconButton>
    </span>
  )

  //delete button
  const del = (
    <span className="bookOverlay">
      <IconButton
        onClick={() => {
          const bookInfo = {
            olkey: olkey,
            owner: owner
          }
          const data = encodeURIComponent(JSON.stringify(bookInfo))
          f('DELETE', '/api/' + owner + '/save/' + data, response => {
            console.log(response)
          })
          snackDelete()
        }}
        tooltip={'Delete ' + reference + ' from Your Books.'}
      >
        <NavigationClose color={red500} />
      </IconButton>
    </span>
  )

  //swap button
  const swap = (
    <span className="bookOverlay">
      <IconButton
        onClick={() => {
          const bookInfo = {
            olkey: olkey,
            owner: owner
          }
          const data = encodeURIComponent(JSON.stringify(bookInfo))
          f('POST', '/api/' + requestor + '/request/' + data, response => {
            console.log(response)
          })
          snackSwap()
        }}
        tooltip={'Request ' + reference + ' from ' + owner + '.'}
      >
        <ActionSwapVerticalCircle />
      </IconButton>
    </span>
  )

  //approveDeny button
  const approveDeny = (
    <span className="approveDeny">
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
              'You have approved a request! See you at Beached Bar this Tuesday night at 8:30pm.'
            )
          })
          snackApprove()
        }}
        style={approveDenyStyle}
        tooltip={'Approve swap of ' + reference + ' with ' + requestor + '.'}
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
            console.log(request)
          })
          snackDeny()
        }}
        style={approveDenyStyle}
        tooltip={'Deny swap of ' + reference + ' with ' + requestor + '.'}
      >
        <NavigationClose color={red500} />
      </IconButton>
    </span>
  )

  //return button based on whichButton prop
  switch (whichButton) {
    case 'add':
      return add
      break
    case 'delete':
      return del
      break
    case 'swap':
      return swap
      break
    case 'approveDeny':
      return approveDeny
      break
    case 'cancelRequest':
      return cancelRequest
      break
    default:
      return null
  }
}

export default WhichButton
