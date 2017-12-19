'use strict'

/*** ENVIRONMENT ***/
const path = process.cwd()
import dotenv from 'dotenv'
dotenv.load()

/*** DEVELOPMENT TOOLS ***/
const DEV = process.env.NODE_ENV === 'development'
const PROD = process.env.NODE_ENV === 'production'

/*** CONTROLLERS ***/

//Handle book additions, ownership updates, swap requests, and deletions
import {
  approveRequest,
  cancelRequest,
  curseOfAlexandria,
  denyRequest,
  library,
  otherShelves,
  removeBook,
  requestBook,
  saveBook,
  userShelves
} from '../controllers/bookController.server.js'

import { loginUser, root } from '../config/authConfig.js'

//Handle user updates and authentication
import {
  genocide,
  getLocation,
  jsValidate,
  saveUser,
  viewUsers,
  updateProfile,
  updatePassword
} from '../controllers/userController.server.js'

//Handle Add Book searches
import { searchSubmit } from '../controllers/searchController.server.js'

/*** ROUTES ***/
export const routes = (app, passport) => {
  //Enforce HTTPS in production
  if (PROD) {
    app.use('*', (req, res, next) => {
      if (req.headers['x-forwarded-proto'] !== 'https') {
        console.log('Redirecting to', process.env.APP_URL + req.url)
        res.redirect(process.env.APP_URL + req.url)
      } else {
        next() /* Continue to other routes if we're not redirecting */
      }
    })
  }
  //This is the name that will display in the client view
  let name_view
  //Authorization check
  const permissions = (req, res, next) => {
    if (req.isAuthenticated()) {
      name_view = req.user.username
      return next()
    } else {
      if (DEV) {
        name_view = 'Developer'
        return next()
      } else {
        res.redirect('/welcome')
      }
    }
  }

  //Login
  //This route exists because making it seems easier than convincing Passport.js
  //to send a simple `json` response when there are login errors.
  app.route('/welcome/jsValidate/:data').post(jsValidate)

  //Main login page and validation routes
  app
    .route('/welcome')
    .get((req, res) => {
      res.sendFile(path + '/dist/welcome.html')
    })
    .post(
      passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/welcome'
      })
    )

  //Root
  app.route('/').get(permissions, (req, res) => {
    res.sendFile(path + '/dist/index.html')
  })

  //Logout
  app.route('/logout').get(permissions, (req, res) => {
    req.logout()
    res.redirect('/welcome')
  })

  //API - They stop working when I require permissions...
  //Search for a book
  app.route('/api/search/:s').post(searchSubmit)

  //User requests a book
  app.route('/api/:user/request/:data').post(requestBook)
  //User cancels their own book request
  app.route('/api/:user/cancelRequest/:data').post(cancelRequest)
  //User denies request for their book
  app.route('/api/:user/denyRequest/:data').post(denyRequest)
  //User approves request for their book
  app.route('/api/:user/approveRequest/:data').post(approveRequest)

  //Update username and location
  app.route('/api/:user/update-profile/:data').post(updateProfile)
  //Update password
  app.route('/api/:user/update-password/:data').post(updatePassword)

  app
    .route('/api/:user/save/:data')
    //Save a book to a user
    .post(saveBook)
    //Delete a user's book
    .delete(removeBook)
  //See a user's books
  app.route('/api/:user/userBooks').get(userShelves)
  //See books that do NOT belong to a user
  app.route('/api/:user/otherBooks').get(otherShelves)

  //Users
  app
    .route('/api/users')
    //See all users
    .get(viewUsers)
    //Save a new user and log the user in
    .post(
      saveUser,
      passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/welcome'
      })
    )

  //Get login name
  app.route('/api/users/logged').get((req, res) => {
    if (DEV) {
      console.log('Client requesting username...')
    }
    res.json(name_view)
  })

  //Get user's location
  app.route('/api/:user/location').get(getLocation)

  /*** DEBUGGING - No UI ***/
  if (DEV) {
    //Remove all stored books
    app.use('/api/burn', curseOfAlexandria)
    //Remove all users
    app.use('/api/purge', genocide)
    //See all books
    app.route('/api/library').get(library)
  }
}
