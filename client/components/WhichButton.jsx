'use strict'

/*** ENVIRONMENT ***/
import dotenv from 'dotenv'
dotenv.load()

/*** DEVELOPMENT TOOLS ***/
const DEV = process.env.NODE_ENV === 'development'

/*** COMPONENTS ***/
//React
import React, { Component } from 'react'

//Material UI
import { pinkA200, amber600, greenA700 } from 'material-ui/styles/colors'
import ActionCheckCircle from 'material-ui/svg-icons/action/check-circle'
import ActionSwapVerticalCircle from 'material-ui/svg-icons/action/swap-vertical-circle'
import ContentAddCircle from 'material-ui/svg-icons/content/add-circle'
import Dialog from 'material-ui/Dialog'
import IconButton from 'material-ui/IconButton'
import NavigationCancel from 'material-ui/svg-icons/navigation/cancel'
import RaisedButton from 'material-ui/RaisedButton'

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
export default class WhichButton extends Component {
  constructor(props) {
    super(props)
    this.state = { approveOpen: false, denyOpen: false }
  }

  render() {
    //constants
    const { approveOpen, denyOpen } = this.state
    const {
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
    } = this.props

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
              f('POST', '/api/' + loggedUser + '/save/' + data, response => {
                if (DEV) {
                  console.log(response)
                }
              })
              snackBar('add')
            }}
            tooltip={'Add ' + reference + ' to Your books.'}
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
            tooltip={'Remove ' + reference + ' from Your books.'}
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

    //approveDeny button and confirmation dialogs
    //Approve dialog
    const confirmBtn = (
      <RaisedButton
        label="Confirm"
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
            //Close dialog
            this.setState({ approveOpen: false })
          })
          snackBar('approve')
        }}
        primary={true}
      />
    )
    const cancelBtn = (
      <RaisedButton
        className="rightBtn"
        label="Cancel"
        onClick={() => {
          this.setState({ approveOpen: false })
        }}
        secondary={true}
      />
    )

    const confirmDialog = (
      <Dialog
        actions={[confirmBtn, cancelBtn]}
        modal={true}
        open={approveOpen}
        title="Swap complete?"
      >
        Have you already swapped this book with its requestor? Once you click Confirm, your book
        will move to their collection. Hit Cancel if you haven't swapped yet.
      </Dialog>
    )

    //Deny dialog
    const denyBtn = (
      <RaisedButton
        label="Confirm"
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
        primary={true}
      />
    )
    const cancelDenyBtn = (
      <RaisedButton
        className="rightBtn"
        label="Cancel"
        onClick={() => {
          this.setState({ denyOpen: false })
        }}
        secondary={true}
      />
    )

    const denyDialog = (
      <Dialog actions={[denyBtn, cancelDenyBtn]} modal={true} open={denyOpen} title="Deny request?">
        Hit Confirm if you're not able to swap this book with its requestor. Note that you can
        remove this book from your collection in your Dashboard. Hit Cancel to take no action.
      </Dialog>
    )

    const approveDeny = (
      <span className="whichButton">
        {confirmDialog}
        {denyDialog}
        <span className="iconBox">
          {/* APPROVE REQUEST */}
          <IconButton
            iconStyle={iconStyle}
            style={{ marginRight: -15 }}
            onClick={() => this.setState({ approveOpen: true })}
            tooltip={'Accept request from ' + requestor + ' for ' + reference}
          >
            <ActionCheckCircle color={greenA700} />
          </IconButton>
          {/* DENY REQUEST */}
          <IconButton
            iconStyle={iconStyle}
            onClick={() => {
              this.setState({ denyOpen: true })
            }}
            className="approveDenyStyle"
            tooltip={'Deny request from ' + requestor + ' for ' + reference}
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
}
