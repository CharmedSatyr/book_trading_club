'use strict'

/*** COMPONENTS ***/
import React, { Component } from 'react'
import Input from './Input.jsx'
import Book from './Book.jsx'
import Divider from 'material-ui/Divider'
import NavBar from './NavBar.jsx'
import Library from './Library.jsx'
import BookSearch from './BookSearch.jsx'
import RaisedButton from 'material-ui/RaisedButton'

/*** FUNCTIONS ***/
import { f } from '../../common/common.functions.js'
import { librarian } from '../controllers/socket.client.jsx'

/*** MAIN ***/
export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bookSearch: [],
      library: []
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit() {
    const query = document.getElementById('search').value
    console.log(query)
    f('POST', '/api/search/' + query, response => {
      this.setState({ bookSearch: response })
    })
  }
  populateLibrary() {
    f('GET', '/api/library', response => {
      this.setState({ library: response })
    })
  }
  /* Keeps library in sync among devices without refresh.                    */
  checkLibrary() {
    librarian(1000, result => {
      if (this.state.library !== result) {
        this.setState({ library: result })
      }
    })
  }
  componentWillMount() {
    this.populateLibrary()
    this.checkLibrary()
  }
  render() {
    return (
      <div>
        <NavBar />
        <Input
          id="search"
          label="Search for a book here! Click the results to add them to your library."
          placeholder="Author, Title, or ISBN"
          btnText="Search"
          fn={this.handleSubmit}
        />{' '}
        {this.state.bookSearch.length > 0 ? (
          <RaisedButton
            label="Clear"
            secondary={true}
            style={{ marginLeft: -2 }}
            onClick={() => {
              this.setState({ bookSearch: [] })
            }}
          />
        ) : (
          <span />
        )}
        <br />
        <BookSearch quest={this.state.bookSearch} fn={this.saveClick} />
        <Divider />
        <h3>Current Library:</h3>
        <Library location={this.state.library} />
      </div>
    )
  }
}
