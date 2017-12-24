'use strict'

/*** ENVIRONMENT ***/
const path = process.cwd()
import dotenv from 'dotenv'
dotenv.load()

/*** DEVELOPMENT TOOLS ***/
const DEV = process.env.NODE_ENV === 'development'
const PROD = process.env.NODE_ENV === 'production'

/*** COMPONENTS ***/
//React
import React from 'react'

//Material UI
import { pinkA200, amber600, greenA700 } from 'material-ui/styles/colors'
import ActionSwapVerticalCircle from 'material-ui/svg-icons/action/swap-vertical-circle'
import ContentAddCircle from 'material-ui/svg-icons/content/add-circle'
import IconButton from 'material-ui/IconButton'
import ActionCheckCircle from 'material-ui/svg-icons/action/check-circle'
import NavigationCancel from 'material-ui/svg-icons/navigation/cancel'

//Styles
const iconStyle = {
  borderRadius: '100%',
  backgroundColor: '#ffffff',
  height: 24,
  width: 24,
  marginTop: 10
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
  snackBar,
  title,
  whichButton
}) => {
  //This is basic inforation about the book that is appears in Icon Button tooltips on hover.
  const reference = title + ' (' + publication + ') by ' + author

  //add button
  const add = (
    <span className="whichButton">
      <span className="iconBox">
        <IconButton
          iconStyle={iconStyle}
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
            snackBar('add')
          }}
          tooltip={'Add ' + reference + ' to Your Books.'}
        >
          <ContentAddCircle color={greenA700} />
        </IconButton>
      </span>
    </span>
  )

  //cancel button
  const cancel = (
    <span className="whichButton">
      <span className="iconBox">
        <IconButton
          iconStyle={iconStyle}
          onClick={() => {
            const bookInfo = {
              olkey: olkey,
              owner: owner
            }
            const data = encodeURIComponent(JSON.stringify(bookInfo))
            f('POST', '/api/' + loggedUser + '/cancelRequest/' + data, response => {
              if (DEV) {
                console.log(response)
              }
            })
            snackBar('cancel')
          }}
          tooltip={'Cancel your request for ' + reference + ' from ' + owner}
        >
          <NavigationCancel color={pinkA200} />
        </IconButton>
      </span>
    </span>
  )
  //delete button
  const del = (
    <span className="whichButton">
      <span className="iconBox">
        <IconButton
          className="icon"
          iconStyle={iconStyle}
          onClick={() => {
            const bookInfo = {
              olkey: olkey,
              owner: owner
            }
            const data = encodeURIComponent(JSON.stringify(bookInfo))
            f('DELETE', '/api/' + owner + '/save/' + data, response => {
              if (DEV) {
                console.log(response)
              }
            })
            snackBar('delete')
          }}
          tooltip={'Remove ' + reference + ' from Your Books.'}
        >
          <NavigationCancel color={pinkA200} />
        </IconButton>
      </span>
    </span>
  )

  //swap button
  const swap = (
    <span className="whichButton">
      <span className="iconBox">
        <IconButton
          iconStyle={iconStyle}
          onClick={() => {
            const bookInfo = {
              olkey: olkey,
              owner: owner
            }
            const data = encodeURIComponent(JSON.stringify(bookInfo))
            f('POST', '/api/' + requestor + '/request/' + data, response => {
              if (DEV) {
                console.log(response)
              }
            })
            snackBar('swap')
          }}
          tooltip={'Request ' + reference + ' from ' + owner}
        >
          <ActionSwapVerticalCircle color={amber600} />
        </IconButton>
      </span>
    </span>
  )

  //approveDeny button
  const approveDeny = (
    <span className="whichButton">
      <span className="iconBox">
        {/* APPROVE REQUEST */}
        <IconButton
          iconStyle={iconStyle}
          style={{ marginRight: -15 }}
          onClick={() => {
            const bookInfo = {
              olkey: olkey,
              owner: owner
            }
            const data = encodeURIComponent(JSON.stringify(bookInfo))
            f('POST', '/api/' + loggedUser + '/approveRequest/' + data, response => {
              if (DEV) {
                console.log(response)
              }
              alert(
                'You have approved a request! See you at Beached Bar this Tuesday night at 8:30pm.'
              )
            })
            snackBar('approve')
          }}
          tooltip={'Approve swap of ' + reference + ' with ' + requestor}
        >
          <ActionCheckCircle color={greenA700} />
        </IconButton>
        {/* DENY REQUEST */}
        <IconButton
          iconStyle={iconStyle}
          onClick={() => {
            const bookInfo = {
              olkey: olkey,
              owner: owner
            }
            const data = encodeURIComponent(JSON.stringify(bookInfo))
            f('POST', '/api/' + loggedUser + '/denyRequest/' + data, response => {
              if (DEV) {
                console.log(response)
              }
            })
            snackBar('deny')
          }}
          className="approveDenyStyle"
          tooltip={'Deny swap of ' + reference + ' with ' + requestor}
        >
          <NavigationCancel color={pinkA200} />
        </IconButton>
      </span>
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
    case 'cancel':
      return cancel
      break
    default:
      return null
  }
}

export default WhichButton
