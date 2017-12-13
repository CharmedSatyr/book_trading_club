'use strict'

/*** COMPONENTS ***/
//React
import React, { Component } from 'react'

//Material UI
import ActionSwapVerticalCircle from 'material-ui/svg-icons/action/swap-vertical-circle'
import IconButton from 'material-ui/IconButton'
import NavigationCheck from 'material-ui/svg-icons/navigation/check'
import NavigationClose from 'material-ui/svg-icons/navigation/close'

//App
import Snack from './Snack.jsx'

//Styles
import { red500, yellow500, blue500, greenA700 } from 'material-ui/styles/colors'

const approveDenyStyle = {
  marginLeft: -10,
  marginRight: -10
}

/*** FUNCTIONS ***/
import { f } from '../../common/common.functions.js'

/*** MAIN ***/
export default class WhichButton extends Component {
  constructor(props) {
    super(props)
    this.state = { message: '' }
  }
  render() {
    const { loggedUser, olkey, owner, requestor, whichButton } = this.props

    //delete button
    const del = (
      <div className="bookOverlay">
        <IconButton
          onClick={() => {
            const bookInfo = {
              olkey: olkey,
              owner: owner
            }
            const data = encodeURIComponent(JSON.stringify(bookInfo))
            f('DELETE', '/api/' + owner + '/save/' + data)
            this.setState({ message: 'Deleting book!' })
          }}
        >
          <NavigationClose color={red500} />
        </IconButton>
        <Snack message={this.state.message} />
      </div>
    )

    //swap button
    const swap = (
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
            this.setState({ message: 'Lets swap!' })
          }}
        >
          <ActionSwapVerticalCircle />
        </IconButton>
        <Snack message={this.state.message} />
      </div>
    )

    //approveDeny button
    const approveDeny = (
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
              this.setState({ message: 'Accepted request!' })
              alert(
                'You have approved a request! See you at Beached Bar this Tuesday night at 8:30pm.'
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
              this.setState({ message: 'Request denied.' })
            })
          }}
          style={approveDenyStyle}
        >
          <NavigationClose color={red500} />
        </IconButton>
        <Snack message={this.state.message} />
      </div>
    )

    //cancelRequest button
    const cancelRequest = (
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
              this.setState({ message: 'Request canceled!' })
            })
          }}
        >
          <NavigationClose color={red500} />
        </IconButton>
        <Snack message={this.state.message} />
      </div>
    )

    //return button based on whichButton prop
    switch (whichButton) {
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
}
