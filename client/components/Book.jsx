'use strict'

/*** COMPONENTS ***/
//React
import React from 'react'

//Material UI
import Paper from 'material-ui/Paper'

/*** VARIABLES ***/
const style = {
  display: 'flex',
  height: 260,
  itemAlign: 'center',
  justifyContent: 'center',
  margin: 16,
  textAlign: 'center',
  width: 180
}

/*** MAIN ***/
const Book = ({ author, title, publication, cover, fn }) => {
  return (
    <span>
      <Paper
        style={style}
        zDepth={4}
        rounded={false}
        className="book"
        onClick={fn}
      >
        <img src={'http://covers.openlibrary.org/b/OLID/' + cover + '-M.jpg'} />
      </Paper>
      <span hidden="true">
        {/*For screen-readers*/}
        {title} ({publication}) by {author}
      </span>
    </span>
  )
}

export default Book
