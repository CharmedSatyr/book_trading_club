'use strict'

/*** COMPONENTS ***/
//React
import React from 'react'

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
const Input = ({ clearBooks, loggedUser, quest, snackAdd, searchBooks, visible }) => {
  const results = quest.map((item, index) => {
    return (
      <Book
        author={item.author}
        cover={item.cover}
        key={index}
        loggedUser={loggedUser}
        olkey={item.olkey}
        publication={item.publication}
        snackAdd={snackAdd}
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
          {visible ? (
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
      <div className="library">{results}</div>
    </span>
  )
}

export default Input
