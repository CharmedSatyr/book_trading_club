'use strict'

/*** ENVIRONMENT ***/
import dotenv from 'dotenv'
dotenv.load()

/*** DEVELOPMENT TOOLS ***/
const DEV = process.env.NODE_ENV === 'development'

/*** MODELS ***/
import User from '../models/User.js'

/*** BCRYPT ***/
import bcrypt from 'bcrypt'
const saltRounds = 10

/*** CONTROLLERS ***/
//Used to update book ownership when invoking updateProfile function
//Or to nullify user's book positions before account deletion
import { changeBookOwner, purgeUserBooks } from './bookController.server.js'

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
      res.json('All users deleted...')
    }
  })
}

//Check if user exists - used for login and signup pre-passport validation
export const jsValidate = (req, res) => {
  if (DEV) {
    console.log('jsValidate')
  }
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
    //Signup validation
    //signup validation does not check any password against the database;
    //it only checks if the requested username is taken.
    if (!pass) {
      if (doc) {
        res.json('NO')
      } else {
        res.json('OK')
      }
    } else {
      //Login validation
      //If there is a password and that user exists
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
      //Error if this user already exists
      res.json('NO')
    } else {
      //Otherwise has the password and save the user information
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

  if (DEV) {
    console.log('Update request received from ' + user)
  }

  //response will be NO if either update returns an error, else OK
  let response

  //If user wants to update the username
  if (update.username) {
    //See if the requested username is already taken
    User.findOne({ username: update.username }, (err, doc) => {
      if (err) {
        console.error(err)
      }
      //If so, send an error message
      if (doc) {
        response = 'NO'
      } else {
        //Else if that name isn't taken, find the existing user
        User.findOneAndUpdate({ username: user }, { username: update.username }, (err, doc2) => {
          if (err) {
            console.error(err)
          }
          if (doc2) {
            changeBookOwner(user, update.username)
            //If there are no previous errors, return OK, else NO
            response === 'NO' ? (response = 'NO') : (response = 'OK')
            console.log('THIS IS IT:', response)
          }
        })
      }
    })
  }

  //If user wants to update their location
  if (update.location) {
    if (DEV) {
      console.log('Updating location to', update.location)
    }
    User.findOneAndUpdate({ username: user }, { location: update.location }, (err, ok) => {
      if (err) {
        console.error(err)
      }
      if (ok) {
        console.log(ok)
        response === 'NO' ? (response = 'NO') : (response = 'OK')
      } else {
        //This is not expected to happen
        response = 'NO'
      }
    })
  }

  //This is a sort of hack to wait until response is defined before sending. Possibly improve using async/await, promises...
  const wait = setInterval(() => {
    if (response) {
      //This response should take into account both username and location updates, returning NO or OK
      if (DEV) {
        console.log('Response will be:', response)
      }
      res.json(response)
      clearInterval(wait)
    }
  }, 500)
}

//Update password
export const updatePassword = (req, res) => {
  const { user } = req.params
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
              res.json('OK')
            })
          })
        } else {
          //Else send error
          res.json('NO')
        }
      })
    } else {
      //No user found - not expected
      res.json('NO')
    }
  })
}

//Delete user and user's books
export const deleteUser = (req, res) => {
  const { user } = req.params

  //Cancel user requests, deny requests for user's books, and remove user's books
  purgeUserBooks(user)

  //Delete the user
  User.remove({ username: user }, (err, doc) => {
    if (err) {
      console.error(err)
    }
    if (doc) {
      if (DEV) {
        console.log('User ' + user + ' deleted...')
      }
      res.json('BYE')
    }
  })
}
