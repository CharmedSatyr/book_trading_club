'use strict'

/*** COMPONENTS ***/
//React
import React from 'react'

//Material UI
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

/*** VARIABLES ***/
const style = {
  margin: 12
}

/*** MAIN ***/
const Input = ({ fn0, fn1, visible }) => {
  return (
    <label htmlFor="search">
      <h3>
        Search for a book here! Click the results to add them to your library.
      </h3>
      <TextField id="search" hintText="Author, Title, or ISBN" />
      <RaisedButton label="Search" primary={true} style={style} onClick={fn0} />
      {visible ? (
        <RaisedButton
          label="Clear"
          secondary={true}
          style={style}
          onClick={fn1}
        />
      ) : (
        <span />
      )}
    </label>
  )
}

export default Input
