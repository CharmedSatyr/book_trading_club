'use strict'

/*** MODEL ***/
import Book from '../models/Book.js'

//Find every book in the database
export const library = (req, res) => {
  Book.find({}, (err, doc) => {
    if (err) {
      console.error(err)
    }
    if (doc) {
      res.json(doc)
    }
  })
}

//Search for books owned by a particular user
export const userShelves = (req, res) => {
  const user = req.params.user
  Book.find({ owner: user }, (err, doc) => {
    if (err) {
      console.error(err)
    }
    if (doc) {
      res.json(doc)
    } else {
      res.json('Nope, nothing')
    }
  })
}

//Remove every book in the database
export const curseOfAlexandria = (req, res) => {
  Book.remove({}, (err, doc) => {
    console.log('All books deleted...')
    res.json(doc)
  })
}

//Constantly checking
export const sternGaze = (message, socket) => {
  console.log('hi')
  socket.on(message, interval => {
    setInterval(() => {
      Book.find({}, (err, doc) => {
        socket.emit(doc)
      })
    }, interval)
  })
}

//Saves a new book to the database
export const saveBook = (req, res) => {
  const user = req.params.user
  const book = JSON.parse(decodeURIComponent(req.params.data))

  Book.findOne(
    {
      olkey: book.olkey
    },
    (err, doc) => {
      if (err) {
        console.error(err)
      }
      if (doc) {
        res.json('This book is already in the database')
      } else {
        const newBook = new Book({
          author: book.author,
          title: book.title,
          publication: book.publication,
          cover: book.cover,
          olkey: book.olkey,
          owner: user
        })
        newBook.save((err, doc) => {
          if (err) {
            console.error(err)
          }
          res.json(
            'This book has been saved! Praise Jesus! It is owned by ' +
              user +
              '!'
          )
        })
      }
    }
  )
}

//Remove a user's book from the database
export const removeBook = (req, res) => {
  const user = req.params.user
  const book = JSON.parse(decodeURIComponent(req.params.data))
  Book.remove(
    {
      owner: user,
      olkey: book.olkey
    },
    (err, doc) => {
      if (err) {
        console.error(err)
      }
      if (doc) {
        console.log('It gone')
      }
    }
  )
}
