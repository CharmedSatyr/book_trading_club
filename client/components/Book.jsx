'use strict'

/*** COMPONENTS ***/
//React
import React from 'react'

//Material UI
import Paper from 'material-ui/Paper'

//App
import WhichButton from './WhichButton.jsx'

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
    <div className="book">
      <Paper
        style={{
          display: 'flex'
        }}
        rounded={false}
        zDepth={4}
      >
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
        <div className="img__wrap">
          <img
            alt={title + ' (' + publication + ') by ' + author}
            className="img__img"
            src={'https://covers.openlibrary.org/b/OLID/' + cover + '-M.jpg'}
            title={title + ' (' + publication + ') by ' + author}
          />
          <div className="img__description_layer">
            <p className="img__description">
              {whichButton === 'swap'
                ? title + ' (' + publication + ') by ' + author + ' is owned by ' + owner
                : title + ' (' + publication + ') by ' + author}
            </p>
          </div>
        </div>
      </Paper>
    </div>
  )
}

export default Book
