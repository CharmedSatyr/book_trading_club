'use strict'

/*** COMPONENTS ***/
import React, { Component } from 'react'
import Book from './Book.jsx'

/*** FUNCTIONS ***/
import { f } from '../../common/common.functions.js'

const saveClick = item => {
  const data = encodeURIComponent(JSON.stringify(item))
  console.log('Saving ' + item.title + ' by ' + item.author)
  f('POST', '/api/save/' + data, response => console.log(response))
}

/*** MAIN ***/
const BookSearch = ({ quest }) => {
  const results = quest.map((item, index) => {
    return (
      <Book
        author={item.author}
        title={item.title}
        publication={item.publication}
        cover={item.cover}
        key={index}
        fn={() => {
          saveClick(item)
        }}
      />
    )
  })

  return <div className="books">{results}</div>
}

export default BookSearch