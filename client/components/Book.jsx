'use strict'

/*** COMPONENTS ***/
//React
import React from 'react'

//Material UI
import Paper from 'material-ui/Paper'
import IconButton from 'material-ui/IconButton'
import NavigationClose from 'material-ui/svg-icons/navigation/close'
import { red500, yellow500, blue500 } from 'material-ui/styles/colors'
import { f } from '../../common/common.functions.js'

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
  whichButton,
  author,
  title,
  publication,
  cover,
  olkey,
  user,
  fn
}) => {
  return (
    <span>
      <div className="bookOverlay">
        {whichButton === 'delete' ? (
          <IconButton
            onClick={() => {
              const bookInfo = {
                olkey: olkey,
                owner: user
              }
              const data = encodeURIComponent(JSON.stringify(bookInfo))
              f('DELETE', '/api/' + user + '/save/' + data)
            }}
          >
            <NavigationClose color={red500} />
          </IconButton>
        ) : (
          <span />
        )}
      </div>
      <Paper
        style={style}
        zDepth={4}
        rounded={false}
        className="book"
        onClick={fn}
      >
        <img src={'http://covers.openlibrary.org/b/OLID/' + cover + '-M.jpg'} />
      </Paper>
      <span hidden="true">
        {/*For screen-readers*/}
        {title} ({publication}) by {author}
      </span>
    </span>
  )
}

export default Book
