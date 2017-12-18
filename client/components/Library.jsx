'use strict'

/*** COMPONENTS ***/
import React from 'react'
import Book from './Book.jsx'

/*** MAIN ***/
const Library = ({ location, whichButton, requestor, snackBar, loggedUser }) => {
  const library = location.map((item, index) => {
    return (
      <Book
        author={item.author}
        cover={item.cover}
        key={index}
        loggedUser={loggedUser}
        olkey={item.olkey}
        owner={item.owner}
        publication={item.publication}
        requestor={requestor}
        snackBar={snackBar}
        title={item.title}
        whichButton={whichButton}
      />
    )
  })

  return <div className="library">{library}</div>
}

export default Library
