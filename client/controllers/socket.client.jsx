'use strict'

import openSocket from 'socket.io-client'
const clientSocket = openSocket()

//Check the full and user's library for differences between client and db
export const librarian = (interval, user, cb) => {
  clientSocket.on('librarian', cb)
  clientSocket.emit('librarian', [interval, user])
}
