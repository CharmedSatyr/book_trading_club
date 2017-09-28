'use strict'

/*** COMPONENTS ***/
import React from 'react'
import Book from './Book.jsx'

/*** MAIN ***/
const Library = ({ location, whichButton, user }) => {
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
        user={user}
        fn={() => {
          console.log('I am in your library!')
        }}
      />
    )
  })

  return <div className="books">{library}</div>
}

export default Library
