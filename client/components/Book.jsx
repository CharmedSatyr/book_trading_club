'use strict'

/*** COMPONENTS ***/
import React, { Component } from 'react'
import Paper from 'material-ui/Paper'

const style = {
  display: 'flex',
  height: 260,
  itemAlign: 'center',
  justifyContent: 'center',
  margin: 20,
  textAlign: 'center',
  width: 180
}

/*** MAIN ***/
const Book = ({ author, title, publication, cover, fn }) => {
  return (
    <span>
      {cover ? (
        <Paper
          style={style}
          zDepth={4}
          rounded={false}
          className="book"
          onClick={fn}
        >
          <img
            src={'http://covers.openlibrary.org/b/OLID/' + cover + '-M.jpg'}
          />
        </Paper>
      ) : (
        <Paper
          style={style}
          zDepth={4}
          rounded={false}
          className="book"
          onClick={fn}
        >
          Title: {title}
          <br />
          Author: {author}
          <br />
          Published: {publication}
          <br />
        </Paper>
      )}
    </span>
  )
}

export default Book
