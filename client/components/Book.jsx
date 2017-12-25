'use strict'

/*** COMPONENTS ***/
//React
import React from 'react'

//Material UI
import { amber600 } from 'material-ui/styles/colors'
//Paper is only here because I started with it, and the WhichButton position
//is currently built around it being here.
import Paper from 'material-ui/Paper'
import RefreshIndicator from 'material-ui/RefreshIndicator'

//React Image
import Img from 'react-image'

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
  snackBar,
  whichButton
}) => {
  const loader = (
    <RefreshIndicator
      size={50}
      left={0}
      top={0}
      loadingColor={amber600}
      status="loading"
      style={{
        display: 'inline-block',
        position: 'relative',
        zIndex: 0
      }}
    />
  )

  const description = whichButton => {
    switch (whichButton) {
      case 'cancel':
        return (
          'Cancel your request from ' +
          owner +
          ' for ' +
          title +
          ' (' +
          publication +
          ') by ' +
          author
        )
        break
      case 'swap':
        return owner + ' owns ' + title + ' (' + publication + ') by ' + author
        break
      case 'approveDeny':
        return requestor + ' has requested ' + title + ' (' + publication + ') by ' + author
        break
      default:
        return title + ' (' + publication + ') by ' + author
    }
  }

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
          snackBar={snackBar}
          title={title}
          whichButton={whichButton}
        />
        <div className="img__wrap">
          <Img
            alt={title + ' (' + publication + ') by ' + author}
            className="img__img"
            loader={loader}
            src={'https://covers.openlibrary.org/b/OLID/' + cover + '-M.jpg'}
            title={title + ' (' + publication + ') by ' + author}
          />
          <div className="img__description_layer">
            <p className="img__description">{description(whichButton)}</p>
          </div>
        </div>
      </Paper>
    </div>
  )
}

export default Book
