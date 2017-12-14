'use strict'

/*** COMPONENTS ***/
//React
import React from 'react'

//Material UI
import Paper from 'material-ui/Paper'

//App
import WhichButton from './WhichButton.jsx'

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
const Book = ({
  author,
  cover,
  olkey,
  loggedUser,
  owner,
  publication,
  requestor,
  title,
  snackAdd,
  snackApprove,
  snackCancel,
  snackDelete,
  snackDeny,
  snackSwap,
  whichButton
}) => {
  return (
    <span>
      <WhichButton
        author={author}
        cover={cover}
        loggedUser={loggedUser}
        olkey={olkey}
        owner={owner}
        publication={publication}
        requestor={requestor}
        snackAdd={snackAdd}
        snackApprove={snackApprove}
        snackCancel={snackCancel}
        snackDelete={snackDelete}
        snackDeny={snackDeny}
        snackSwap={snackSwap}
        title={title}
        whichButton={whichButton}
      />
      <Paper className="book" rounded={false} style={style} zDepth={4}>
        <img
          onClick={() => {
            //Every book will log basic information about it on click.
            console.log(
              title + ' (' + publication + ') by ' + author + ' is owned by ' + owner + '.'
            )
          }}
          src={'https://covers.openlibrary.org/b/OLID/' + cover + '-M.jpg'}
        />
      </Paper>
      <span hidden="true">
        {/*For screen-readers*/}
        {title} ({publication}) by {author}
      </span>
    </span>
  )
}

export default Book
