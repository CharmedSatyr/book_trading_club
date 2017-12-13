'use strict'

/*** COMPONENTS ***/
import React from 'react'
import Book from './Book.jsx'

/*** MAIN ***/
const Library = ({
  location,
  whichButton,
  requestor,
  snackApprove,
  snackCancel,
  snackDelete,
  snackDeny,
  snackSwap,
  loggedUser
}) => {
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
        snackApprove={snackApprove}
        snackCancel={snackCancel}
        snackDelete={snackDelete}
        snackDeny={snackDeny}
        snackSwap={snackSwap}
        title={item.title}
        whichButton={whichButton}
      />
    )
  })

  return <div className="books">{library}</div>
}

export default Library
