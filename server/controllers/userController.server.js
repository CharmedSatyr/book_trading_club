'use strict'

/*** MODEL ***/
import User from '../models/User.js'

/*** CONTROLLERS ***/
//Find every user in the database
export const allUsers = (req, res) => {
  User.find({}, (err, doc) => {
    res.json(doc)
  })
}

//Remove every user in the database
export const genocide = (req, res) => {
  User.remove({}, (err, doc) => {
    console.log('All users deleted...')
    res.json(doc)
  })
}

//View all users in the database
export const viewUsers = (req, res) => {
  User.find({}, (err, results) => {
    if (err) {
      console.error(err)
    }
    if (results) {
      res.json(results)
    }
  })
}

//Saves a new user to the database
export const saveUser = (req, res, next) => {
  const user = req.body
  User.findOne(
    {
      username: user.username
    },
    (err, doc) => {
      if (err) {
        console.error(err)
      }
      if (doc) {
        res.json('This username is taken. Please choose another.')
      } else {
        const newUser = new User({
          username: user.username,
          password: user.password,
          location: user.location
        })
        newUser.save((err, doc) => {
          if (err) {
            console.error(err)
          }
          console.log(user.username + ' successfully signed up. Logging in.')
          return next()
        })
      }
    }
  )
}
