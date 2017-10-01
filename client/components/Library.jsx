'use strict'

/*** COMPONENTS ***/
import React from 'react'
import Book from './Book.jsx'

/*** MAIN ***/
const Library = ({ location, whichButton, requestor, loggedUser }) => {
  const library = location.map((item, index) => {
    return (
      <Book
        key={index}
        whichButton={whichButton}
        author={item.author}
        title={item.title}
        publication={item.publication}
        cover={item.cover}
        olkey={item.olkey}
        owner={item.owner}
        requestor={requestor}
        loggedUser={loggedUser}
        fn={() => {
          console.log('This book is owned by', item.owner)
        }}
      />
    )
  })

  return <div className="books">{library}</div>
}

export default Library
