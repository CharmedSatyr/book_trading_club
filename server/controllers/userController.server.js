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

//Saves a new user to the database
export const saveUser = (req, res) => {
  const user = JSON.parse(decodeURIComponent(req.params.userData))

  User.findOne(
    {
      username: user.username
    },
    (err, doc) => {
      if (err) {
        console.error(err)
      }
      if (doc) {
        res.json('This user is already in the database!')
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
          res.json(
            'This User, our brothasista in Christ, ' +
              user.username +
              ', has been saved! Praise the Lord!'
          )
        })
      }
    }
  )
}
