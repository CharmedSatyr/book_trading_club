'use strict'

/*** COMPONENTS ***/
//React
import React from 'react'

//Material UI
import Divider from 'material-ui/Divider'
import RaisedButton from 'material-ui/RaisedButton'
import Subheader from 'material-ui/Subheader'
import TextField from 'material-ui/TextField'

//App
import Book from './Book.jsx'

/*** FUNCTIONS ***/
import { f } from '../../common/common.functions.js'

/*** MAIN ***/
const Input = ({ clearBooks, loggedUser, quest, snackAdd, searchBooks, visible }) => {
  const results = quest.map((item, index) => {
    return (
      <Book
        author={item.author}
        cover={item.cover}
        key={index}
        loggedUser={loggedUser}
        publication={item.publication}
        snackAdd={snackAdd}
        title={item.title}
        whichButton="add"
      />
    )
  })

  return (
    <div
      style={{ marginLeft: '10vw', marginRight: '10vw', marginBottom: '10px', marginTop: '10px' }}
    >
      <h2>Add Books</h2>
      <Divider />
      <Subheader>Search for a book here! Click the results to add them to your library.</Subheader>

      <form>
        <TextField id="search" hintText="Author, Title, or ISBN" />
        <RaisedButton
          label="Search"
          primary={true}
          className="RaisedButton"
          onClick={searchBooks}
        />
        {visible ? (
          <RaisedButton
            label="Clear"
            secondary={true}
            className="RaisedButton"
            onClick={clearBooks}
          />
        ) : null}
      </form>
      <br />
      <Divider />
      <div className="bookSearch">{results}</div>
    </div>
  )
}

export default Input
