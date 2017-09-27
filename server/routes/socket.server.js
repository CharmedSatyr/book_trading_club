'use strict'

import Book from '../models/Book.js'

import { sternGaze } from '../controllers/bookController.server.js'

const ioEvents = io => {
  io.on('connection', serverSocket => {
    console.log('Web Sockets connected.')

    serverSocket.on('librarian', received => {
      setInterval(() => {
        //Full library
        Book.find({}, (err, doc) => {
          if (err) {
            console.error(err)
          }
          if (doc) {
            serverSocket.emit('librarian', [doc, null])
          }
        })

        //Personal library
        Book.find({ owner: [received[1]] }, (err, doc) => {
          if (err) {
            console.error(err)
          }
          if (doc) {
            serverSocket.emit('librarian', [null, doc])
          }
        })
      }, received[0])
    })

    //    sternGaze('librarian', serverSocket)

    io.on('disconnect', () => {
      console.log('Web Sockets disconnected.')
    })
  })
}

export default ioEvents
