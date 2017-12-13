'use strict'

/*** COMPONENTS ***/
//React
import React, { Component } from 'react'

//Material UI
import Snackbar from 'material-ui/Snackbar'

/*** MAIN ***/
export default class Snack extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      message: ''
    }
    this.handleRequestClose = this.handleRequestClose.bind(this)
    this.timer = undefined
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.message.length > 0) {
      this.setState({
        message: nextProps.message,
        open: true
      })
    }
  }
  handleRequestClose() {
    this.setState({
      open: false
    })
  }
  shouldComponentUpdate(nextProps, nextState) {
    //console.log('Snack nextState:', nextState)
    if (this.state === nextState) {
      return false
    } else {
      return true
    }
  }
  render() {
    const { message, open } = this.state
    return (
      <Snackbar
        action="close"
        autoHideDuration={3000}
        message={message}
        onClick={this.handleRequestClose}
        onRequestClose={this.handleRequestClose}
        open={open}
      />
    )
  }
}
