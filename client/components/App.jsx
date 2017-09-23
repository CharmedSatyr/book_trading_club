'use strict'

/*** COMPONENTS ***/
//React
import React, { Component } from 'react'

//Material UI
import Divider from 'material-ui/Divider'

//App
import BookSearch from './BookSearch.jsx'
import Input from './Input.jsx'
import Library from './Library.jsx'
import NavBar from './NavBar.jsx'
import SignupLogin from './SignupLogin.jsx'

/*** FUNCTIONS ***/
import { f } from '../../common/common.functions.js'
import { librarian } from '../controllers/socket.client.jsx'

/*** MAIN ***/
export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bookSearch: [],
      library: [],
      logged: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.clearBooks = this.clearBooks.bind(this)
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
  /* Keeps library in sync among devices without refresh using web sockets. */
  checkLibrary() {
    librarian(1000, result => {
      if (this.state.library !== result) {
        this.setState({ library: result })
      }
    })
  }
  clearBooks() {
    this.setState({ bookSearch: [] })
    document.getElementById('search').value = ''
  }
  componentWillMount() {
    this.populateLibrary()
    this.checkLibrary()
  }
  render() {
    return (
      <div>
        <NavBar
          appfn={() => {
            this.setState({ logged: !this.state.logged })
          }}
        />
        {this.state.logged === false ? (
          <SignupLogin />
        ) : (
          <div>
            <Input
              fn0={this.handleSubmit}
              fn1={this.clearBooks}
              visible={this.state.bookSearch.length > 0}
            />
            <br />
            <BookSearch quest={this.state.bookSearch} />
            <Divider />
            <h3>Current Library:</h3>
            <Library location={this.state.library} />
          </div>
        )}
      </div>
    )
  }
}
