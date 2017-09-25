'use strict'

/*** COMPONENTS ***/
import React from 'react'
import Book from './Book.jsx'

/*** MAIN ***/
const Library = ({ location }) => {
  const library = location.map((item, index) => {
    return (
      <Book
        author={item.author}
        title={item.title}
        publication={item.publication}
        cover={item.cover}
        key={index}
        fn={() => {
          console.log('I am in your library!')
        }}
      />
    )
  })

  return <div className="books">{library}</div>
}

export default Library
