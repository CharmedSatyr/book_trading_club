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
  const { user } = req.params
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

//Search for books NOT owned by a particular user
export const otherShelves = (req, res) => {
  const { user } = req.params
  Book.find({ owner: { $ne: user } }, (err, doc) => {
    if (err) {
      console.error(err)
    }
    if (doc) {
      res.json(doc)
    } else {
      res.json('Nope, you own the whole library.')
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
  socket.on(message, interval => {
    setInterval(() => {
      Book.find({}, (err, doc) => {
        socket.emit(doc)
      })
    }, interval)
  })
}

//Mark a book as requested by a user
export const requestBook = (req, res) => {
  const { user } = req.params
  const book = JSON.parse(decodeURIComponent(req.params.data))

  Book.findOneAndUpdate({ olkey: book.olkey }, { requested: true, requestor: user }, (err, doc) => {
    if (err) {
      console.error(err)
    }
    if (doc) {
      res.json('Book requested.')
    }
  })
}

//Mark a book as NOT requested
export const cancelRequest = (req, res) => {
  const { user } = req.params
  const book = JSON.parse(decodeURIComponent(req.params.data))

  Book.findOneAndUpdate(
    {
      olkey: book.olkey,
      requestor: user,
      requested: true
    },
    { requested: false, requestor: '' },
    (err, doc) => {
      if (err) {
        console.error(err)
      }
      if (doc) {
        res.json('Request for book with olkey ' + book.olkey + ' cancelled.')
      }
    }
  )
}

//Approve Request
export const approveRequest = (req, res) => {
  const { user } = req.params
  const book = JSON.parse(decodeURIComponent(req.params.data))

  Book.findOne({ olkey: book.olkey, owner: user, requested: true }, (err, doc) => {
    if (err) {
      console.error(err)
    }
    if (doc) {
      console.log('Before', doc)
      doc.owner = doc.requestor
      doc.requestor = ''
      doc.requested = false
      console.log('After', doc)
      doc.save((err, result) => {
        console.log('Saved', result)
        res.json('You have successfully swapped a book!')
      })
    }
  })
}

//Deny request
export const denyRequest = (req, res) => {
  const { user } = req.params
  const book = JSON.parse(decodeURIComponent(req.params.data))

  Book.findOneAndUpdate(
    {
      olkey: book.olkey,
      owner: user,
      requested: true
    },
    { requested: false, requestor: '' },
    (err, doc) => {
      if (err) {
        console.error(err)
      }
      if (doc) {
        res.json('Request for book with olkey ' + book.olkey + ' denied.')
      }
    }
  )
}

//Saves a new book to the database
export const saveBook = (req, res) => {
  const { user } = req.params
  const book = JSON.parse(decodeURIComponent(req.params.data))

  Book.findOne(
    {
      username: user,
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
          res.json('This book has been saved! Praise Jesus! It is owned by ' + user + '!')
        })
      }
    }
  )
}

//Remove a user's book from the database
export const removeBook = (req, res) => {
  const { user } = req.params
  const book = JSON.parse(decodeURIComponent(req.params.data))
  console.log(book)
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
        console.log(doc + ' has been deleted.')
        res.json(doc + ' has been deleted.')
      }
    }
  )
}

//Update the user's book ownership to their new username
//Invoked in userController
export const changeBookOwner = (user, newName) => {
  Book.find({ owner: user }, (err, doc) => {
    console.log('Updating book ownership to new username...')
    if (err) {
      console.error(err)
    }
    if (doc) {
      doc.map(item => {
        item.owner = newName
        item.save((err, ok) => {
          if (err) {
            console.error(err)
          }
          console.log('Book ownership updated:', ok)
        })
      })
    }
  })
}
