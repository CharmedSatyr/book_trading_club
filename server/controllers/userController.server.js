'use strict'

/*** ENVIRONMENT ***/
const path = process.cwd()
import dotenv from 'dotenv'
dotenv.load()

/*** DEVELOPMENT TOOLS ***/
const DEV = process.env.NODE_ENV === 'development'
const PROD = process.env.NODE_ENV === 'production'

/*** MODELS ***/
import User from '../models/User.js'

/*** BCRYPT ***/
import bcrypt from 'bcrypt'
const saltRounds = 10

/*** CONTROLLERS ***/
//Used to update book ownership when invoking updateProfile function
import { changeBookOwner } from './bookController.server.js'

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

//Remove every user in the database
export const genocide = (req, res) => {
  User.remove({}, (err, doc) => {
    if (err) {
      console.error(err)
    }
    if (doc) {
      console.log('All users deleted...')
      res.json(doc)
    }
  })
}

//Check if user exists - used for login and signup pre-passport validation
export const jsValidate = (req, res) => {
  const data = JSON.parse(decodeURIComponent(req.params.data))
  const user = data.username
  const pass = data.password
  if (DEV) {
    console.log('Validating username ' + user + ' with password ' + pass)
  }

  User.findOne({ username: user }, (err, doc) => {
    if (err) {
      console.error(err)
    }
    //If that user exists
    if (doc) {
      //Check current password submission against what's in the database
      bcrypt.compare(pass, doc.password, (err, verdict) => {
        //If it works, validation complete
        if (verdict) {
          res.json('OK')
        } else {
          //If thse password doesn't work, there's a problem
          res.json('NO')
        }
      })
    } else {
      //If there's no such user, there's a problem
      res.json('NO')
    }
  })
}

//Get user's location
export const getLocation = (req, res) => {
  const { user } = req.params
  User.findOne({ username: user }, (err, doc) => {
    if (err) {
      console.error(err)
    }
    if (doc) {
      res.json(doc.location)
    } else {
      if (DEV) {
        res.json('CodeLand')
      }
    }
  })
}

//Save a new user to the database
export const saveUser = (req, res, next) => {
  const user = req.body
  User.findOne({ username: user.username }, (err, doc) => {
    if (err) {
      console.error(err)
    }
    if (doc) {
      res.json('This username is taken. Please choose another.')
    } else {
      bcrypt.hash(user.password, saltRounds, (err, hash) => {
        const newUser = new User({
          username: user.username,
          password: hash,
          location: user.location
        })

        newUser.save((err, doc) => {
          if (err) {
            console.error(err)
          }
          console.log(user.username + ' successfully signed up. Logging in.')
          return next()
        })
      })
    }
  })
}

//Update location or username
export const updateProfile = (req, res) => {
  const { user } = req.params
  const update = JSON.parse(decodeURIComponent(req.params.data))

  //If user wants to update the username
  if (update.username) {
    //See if the requested username is already taken
    User.findOne({ username: update.username }, (err, doc) => {
      if (err) {
        console.error(err)
      }
      //If so, send an error message
      if (doc) {
        res.json('A user by this name already exists. Please try a different username.')
      } else {
        //Else if that name isn't taken, find the existing user
        User.findOneAndUpdate({ username: user }, { username: update.username }, (err, doc2) => {
          if (err) {
            console.error(err)
          }
          if (doc2) {
            changeBookOwner(user, update.username)
            res.json('Successfully updated username and associated book ownership.')
          }
        })
      }
    })
  }

  //If user wants to update their location
  if (update.location) {
    User.findOneAndUpdate({ username: user }, { location: update.location }, (err, ok) => {
      if (err) {
        console.error(err)
      }
      if (ok) {
        console.log(ok)
        res.json('New location:' + ok.location)
      }
    })
  }
}

//Update password
export const updatePassword = (req, res) => {
  const user = req.params.user
  const update = JSON.parse(decodeURIComponent(req.params.data))
  User.findOne({ username: user }, (err, doc) => {
    if (err) {
      console.error(err)
    }
    if (doc) {
      //Check current password submission against what's in the database
      bcrypt.compare(update.currentPassword, doc.password, (err, verdict) => {
        //If it works, hash and save the new password submission
        if (verdict) {
          bcrypt.hash(update.newPassword, saltRounds, (err, hash) => {
            doc.password = hash
            doc.save((err, result) => {
              if (err) {
                console.error(err)
              }
              res.json('Password successfully changed.')
            })
          })
        } else {
          res.json('There was a problem changing your password. Please try again.')
        }
      })
    } else {
      res.json('There was a problem changing your password. Please try again.')
    }
  })
}
