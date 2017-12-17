'use strict'

/*** COMPONENTS ***/
//React
import React from 'react'

/*** MAIN ***/
const Footer = () => {
  return (
    <span className="footer">
      Designed and coded by{' '}
      <a href="https://github.com/CharmedSatyr/book_trading_club" rel="noopener" target="_blank">
        <span className="a">CharmedSatyr</span>
      </a>{' '}
      &#8226; Book information provided by{' '}
      <a href="https://openlibrary.org" rel="noopener" target="_blank">
        <span className="b">Open Library</span>
      </a>{' '}
      &#8226;{' '}
      <a
        href="https://github.com/CharmedSatyr/book_trading_club/blob/master/LICENSE"
        rel="noopener"
        target="_blank"
      >
        <span className="c">GNU General Public License v3.0</span>
      </a>
    </span>
  )
}

export default Footer
