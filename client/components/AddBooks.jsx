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
import { amber600 } from 'material-ui/styles/colors'
import ActionSearch from 'material-ui/svg-icons/action/search'
import Divider from 'material-ui/Divider'
import RaisedButton from 'material-ui/RaisedButton'
import RefreshIndicator from 'material-ui/RefreshIndicator'
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
    this.state = {
      bookSearch: [],
      inProgress: 'Results will appear here.',
      loader: 'hide'
    }
    this.clearBooks = this.clearBooks.bind(this)
    this.searchBooks = this.searchBooks.bind(this)
  }
  clearBooks() {
    this.setState({ bookSearch: [], inProgress: 'Results will appear here.', loader: 'hide' })
    document.getElementById('search').value = ''
  }
  searchBooks() {
    const query = document.getElementById('search').value

    if (DEV) {
      console.log('Search:', query)
    }
    if (query) {
      this.setState({ bookSearch: [], inProgress: 'Searching...', loader: 'loading' })
      f('POST', '/api/search/' + query, response => {
        if (DEV) {
          console.log('Search response:', response)
          console.log(typeof response)
        }
        if (typeof response === 'object') {
          this.setState({
            bookSearch: response,
            inProgress: 'Results will appear here.',
            loader: 'hide'
          })
        } else {
          this.setState({ bookSearch: [], inProgress: 'No results found.', loader: 'hide' })
        }
      })
    }
  }
  render() {
    const { clearBooks, searchBooks } = this
    const { loggedUser, snackBar } = this.props
    const { bookSearch, inProgress } = this.state

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
              className="RaisedButtonProfile"
              fullWidth={true}
              label="Search"
              onClick={searchBooks}
              primary={true}
            />
            {bookSearch.length > 0 ? (
              <RaisedButton
                className="RaisedButtonProfile"
                fullWidth={true}
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
          {bookSearch.length > 0 ? (
            <Subheader>Results</Subheader>
          ) : (
            <Subheader>{inProgress}</Subheader>
          )}
          {results}
          <div className="searchLoaderContainer">
            <RefreshIndicator
              size={150}
              left={10}
              top={0}
              loadingColor={amber600}
              status={this.state.loader}
              style={{
                display: 'inline-block',
                position: 'relative',
                zIndex: 0
              }}
            />
          </div>
        </div>
      </span>
    )
  }
}
