'use strict'

/*** ENVIRONMENT ***/
const path = process.cwd()

/*** MODEL ***/
import User from '../models/User.js'

/*** PASSPORT ***/
import passport from 'passport'
import { Strategy } from 'passport-local'

/*** BCRYPT ***/
import bcrypt from 'bcrypt'

/*** CONTROLLERS ***/
export const authConfig = passport => {
  /*** Configure the local strategy for use by Passport.                      *
   * The local strategy require a `verify` function which receives the        *
   * credentials (`username` and `password`) submitted by the user.  The      *
   * function must verify that the password is correct and then invoke `cb`   *
   * with a user object, which will be set at `req.user` in route handlers    *
   * after authentication.                                                  ***/
  passport.use(
    new Strategy((username, password, done) => {
      User.findOne({ username: username }, (err, user) => {
        if (err) {
          return done(err)
        }
        if (!user) {
          return done(null, false)
        }

        //Compare the stored hash to a hash of the submitted password
        bcrypt.compare(password, user.password, (err, res) => {
          //res === true if they match
          if (!res) {
            console.log('Bad password')
            return done(null, false)
          }
          return done(null, user)
        })
      })
    })
  )

  /*** Configure Passport authenticated session persistence.                  *
   * In order to restore authentication state across HTTP requests, Passport  *
   * needs to serialize users into and deserialize users out of the session.  *
   * The typical implementation of this is as simple as supplying the user ID *
   * when serializing, and querying the user record by ID from the database   *
   * when deserializing.                                                    ***/
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user)
    })
  })
}

//Root is used with permissions dependent on NODE_ENV
export const root = (req, res) => {
  res.sendFile(path + '/dist/index.html')
}
