'use strict'

/*** COMPONENTS ***/
//React
import React from 'react'

//Material UI
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Subheader from 'material-ui/Subheader'

/*** VARIABLES ***/
const style = {
  margin: 12
}

/*** MAIN ***/
const Input = ({ clearBooks, searchBooks, visible }) => {
  return (
    <label htmlFor="search">
      <Subheader>Search for a book here! Click the results to add them to your library.</Subheader>
      <TextField id="search" hintText="Author, Title, or ISBN" />
      <RaisedButton label="Search" primary={true} style={style} onClick={searchBooks} />
      {visible ? (
        <RaisedButton label="Clear" secondary={true} style={style} onClick={clearBooks} />
      ) : null}
    </label>
  )
}

export default Input
