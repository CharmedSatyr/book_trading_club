'use strict'

import Book from '../models/Book.js'

import { sternGaze } from '../controllers/bookController.server.js'

const ioEvents = io => {
  io.on('connection', serverSocket => {
    console.log('Web Sockets connected.')

    serverSocket.on('librarian', received => {
      setInterval(() => {
        //User shelves
        Book.find({ owner: [received[1]] }, (err, doc) => {
          if (err) {
            console.error(err)
          }
          if (doc) {
            serverSocket.emit('librarian', [doc, null, null, null, null])
          }
        })

        //Other shelves
        Book.find(
          { owner: { $ne: [received[1]] }, requested: false },
          (err, doc) => {
            if (err) {
              console.error(err)
            }
            if (doc) {
              serverSocket.emit('librarian', [null, doc, null, null, null])
            }
          }
        )

        //Requested books
        Book.find({ requested: true }, (err, doc) => {
          if (err) {
            console.error(err)
          }
          if (doc) {
            serverSocket.emit('librarian', [null, null, doc, null, null])
          }
        })

        //Requested by user
        Book.find({ requested: true, requestor: received[1] }, (err, doc) => {
          if (err) {
            console.error(err)
          }
          if (doc) {
            serverSocket.emit('librarian', [null, null, null, doc, null])
          }
        })

        //Requests for user's books
        Book.find({ requested: true, owner: received[1] }, (err, doc) => {
          if (err) {
            console.error(err)
          }
          if (doc) {
            serverSocket.emit('librarian', [null, null, null, null, doc])
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
