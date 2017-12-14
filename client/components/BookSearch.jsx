'use strict'

/*** COMPONENTS ***/
//React
import React from 'react'

//App
import Book from './Book.jsx'

/*** MAIN ***/
const BookSearch = ({ quest, snackAdd, loggedUser }) => {
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

  return <div className="bookSearch">{results}</div>
}

export default BookSearch
