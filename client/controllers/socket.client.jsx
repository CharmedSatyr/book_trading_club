'use strict'

import openSocket from 'socket.io-client'
const clientSocket = openSocket()

//Get tickers once per second
export const librarian = (interval, cb) => {
  clientSocket.on('librarian', cb)
  clientSocket.emit('librarian', interval)
}
