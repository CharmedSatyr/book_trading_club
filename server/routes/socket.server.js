'use strict'

import Book from '../models/Book.js'

import { sternGaze } from '../controllers/bookController.server.js'

const ioEvents = io => {
  io.on('connection', serverSocket => {
    console.log('Web Sockets connected.')

    serverSocket.on('librarian', interval => {
      setInterval(() => {
        Book.find({}, (err, doc) => {
          serverSocket.emit('librarian', doc)
        })
      }, interval)
    })

    //    sternGaze('librarian', serverSocket)

    io.on('disconnect', () => {
      console.log('Web Sockets disconnected.')
    })
  })
}

export default ioEvents
