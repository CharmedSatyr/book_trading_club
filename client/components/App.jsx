'use strict'

/*** COMPONENTS ***/
import React, { Component } from 'react'
import Input from './Input.jsx'
import Book from './Book.jsx'
import Divider from 'material-ui/Divider'

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
    this.saveClick = this.saveClick.bind(this)
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
  saveClick(item) {
    const data = encodeURIComponent(JSON.stringify(item))
    console.log('Saving ' + item.title + ' by ' + item.author)
    f('POST', '/api/save/' + data, response => console.log(response))
    this.setState({ bookSearch: [] })
  }
  componentWillMount() {
    this.populateLibrary()
    this.checkLibrary()
  }
  render() {
    const results = this.state.bookSearch.map((item, index) => {
      return (
        <Book
          author={item.author[0]}
          title={item.title}
          publication={item.publication}
          cover={item.cover}
          key={index}
          fn={() => {
            this.saveClick(item)
          }}
        />
      )
    })

    const library = this.state.library.map((item, index) => {
      return (
        <Book
          author={item.author[0]}
          title={item.title}
          publication={item.publication}
          cover={item.cover ? item.cover : null}
          key={index}
          fn={() => {
            console.log('I am in your library!')
          }}
        />
      )
    })
    return (
      <div>
        <Input
          id="search"
          label="Search for a book here! Click the results to add them to your library."
          placeholder="Author, Title, or ISBN"
          btnText="Search"
          fn={this.handleSubmit}
        />
        <br />
        <div className="books">{results}</div>
        <Divider />
        <h3>Current Library:</h3>
        <div className="books">{library}</div>
      </div>
    )
  }
}
