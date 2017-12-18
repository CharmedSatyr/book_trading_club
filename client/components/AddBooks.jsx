'use strict'

/*** ENVIRONMENT ***/
import dotenv from 'dotenv'
dotenv.load()

/*** DEVELOPMENT TOOLS ***/
const DEV = process.env.NODE_ENV === 'development'
const PROD = process.env.NODE_ENV === 'production'

/*** COMPONENTS ***/
//React
import React, { Component } from 'react'

//Material UI
import ActionSearch from 'material-ui/svg-icons/action/search'
import Divider from 'material-ui/Divider'
import RaisedButton from 'material-ui/RaisedButton'
import Subheader from 'material-ui/Subheader'
import TextField from 'material-ui/TextField'

//App
import Book from './Book.jsx'

/*** FUNCTIONS ***/
import { f } from '../../common/common.functions.js'

/*** MAIN ***/
export default class AddBooks extends Component {
  constructor(props) {
    super(props)
    this.state = { bookSearch: [] }
    this.clearBooks = this.clearBooks.bind(this)
    this.searchBooks = this.searchBooks.bind(this)
  }
  clearBooks() {
    this.setState({ bookSearch: [] })
    document.getElementById('search').value = ''
  }
  searchBooks() {
    const query = document.getElementById('search').value
    if (DEV) {
      console.log('Search:', query)
    }
    f('POST', '/api/search/' + query, response => {
      if (DEV) {
        console.log('Search response:', response)
      }
      this.setState({ bookSearch: response })
    })
  }
  render() {
    const { clearBooks, searchBooks } = this
    const { loggedUser, quest, snackBar, visible } = this.props
    const { bookSearch } = this.state

    const results = bookSearch.map((item, index) => {
      return (
        <Book
          author={item.author}
          cover={item.cover}
          key={index}
          loggedUser={loggedUser}
          olkey={item.olkey}
          publication={item.publication}
          snackBar={snackBar}
          title={item.title}
          whichButton="add"
        />
      )
    })

    return (
      <span>
        <h2>Add Books</h2>
        <div className="infoBox">
          <h4>
            <ActionSearch />Show others what you have to swap!
          </h4>
        </div>
        <Divider />
        <div className="formBox">
          <form>
            <TextField
              fullWidth={true}
              hintText="Author, Title, or ISBN"
              floatingLabelText="Add a book to your collection"
              id="search"
            />
            <RaisedButton
              buttonStyle={{ width: '100%' }}
              className="RaisedButtonProfile"
              label="Search"
              onClick={searchBooks}
              primary={true}
            />
            {bookSearch.length > 0 ? (
              <RaisedButton
                className="RaisedButtonProfile"
                buttonStyle={{ width: '100%' }}
                label="Clear"
                onClick={clearBooks}
                secondary={true}
              />
            ) : null}
          </form>
        </div>
        <br />
        <Divider />
        <div className="library">
          {bookSearch.length > 0 ? <Subheader>Results</Subheader> : null}
          {results}
        </div>
      </span>
    )
  }
}
