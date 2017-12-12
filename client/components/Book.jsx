'use strict'

/*** COMPONENTS ***/
//React
import React, { Component } from 'react'

//Material UI
import Paper from 'material-ui/Paper'
import Snackbar from 'material-ui/Snackbar'

//App
import WhichButton from './WhichButton.jsx'

/*** VARIABLES ***/
const style = {
  display: 'flex',
  height: 260,
  itemAlign: 'center',
  justifyContent: 'center',
  margin: 16,
  textAlign: 'center',
  width: 180
}

/*** MAIN ***/
export default class Book extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: 'Saving book...',
      open: false
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleRequestClose = this.handleRequestClose.bind(this)
    this.timer = undefined
  }
  componentWillMount() {
    clearTimeout(this.timer)
  }
  handleClick() {
    const { author, saveBook, title } = this.props
    this.setState({
      open: true
    })
    saveBook() //Save the book
    this.timer = setTimeout(() => {
      this.setState({
        message: `${title} by ${author} has been added to Your Books.`
      })
    }, 1500)
  }
  handleRequestClose() {
    this.setState({
      open: false
    })
  }
  render() {
    const {
      author,
      cover,
      olkey,
      loggedUser,
      owner,
      publication,
      requestor,
      title,
      whichButton
    } = this.props

    const { message, open } = this.state

    return (
      <span>
        <WhichButton
          loggedUser={loggedUser}
          olkey={olkey}
          owner={owner}
          requestor={requestor}
          whichButton={whichButton}
        />
        <Paper className="book" onClick={this.handleClick} rounded={false} style={style} zDepth={4}>
          <img src={'https://covers.openlibrary.org/b/OLID/' + cover + '-M.jpg'} />
        </Paper>
        <span hidden="true">
          {/*For screen-readers*/}
          {title} ({publication}) by {author}
        </span>
        <Snackbar
          action=""
          autoHideDuration={3000}
          onRequestClose={this.handleRequestClose}
          open={open}
          message={message}
        />
      </span>
    )
  }
}
