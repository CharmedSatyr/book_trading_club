'use strict'

/*** COMPONENTS ***/
import React, { Component } from 'react'
import Book from './Book.jsx'

/*** MAIN ***/
const Library = ({ location }) => {
  const library = location.map((item, index) => {
    return (
      <Book
        author={item.author[0]}
        title={item.title}
        publication={item.publication}
        cover={item.cover ? item.cover : null}
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
