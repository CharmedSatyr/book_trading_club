'use strict'

/*** COMPONENTS ***/
//React
import React from 'react'

//Material UI
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Subheader from 'material-ui/Subheader'

/*** MAIN ***/
const Input = ({ clearBooks, searchBooks, visible }) => {
  return (
    <form>
      <Subheader>Search for a book here! Click the results to add them to your library.</Subheader>
      <TextField id="search" hintText="Author, Title, or ISBN" />
      <RaisedButton label="Search" primary={true} className="RaisedButton" onClick={searchBooks} />
      {visible ? (
        <RaisedButton
          label="Clear"
          secondary={true}
          className="RaisedButton"
          onClick={clearBooks}
        />
      ) : null}
    </form>
  )
}

export default Input

