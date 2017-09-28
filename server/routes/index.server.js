'use strict'
const path = process.cwd()
import {
  library,
  saveBook,
  removeBook,
  userShelves,
  curseOfAlexandria
} from '../controllers/bookController.server.js'

import { loginUser } from '../config/authConfig.js'
import {
  saveUser,
  viewUsers,
  genocide
} from '../controllers/userController.server.js'
import { searchSubmit } from '../controllers/searchController.server.js'

export const routes = (app, passport) => {
  let name_view
  //Auth check
  const permissions = (req, res, next) => {
    if (req.isAuthenticated()) {
      name_view = req.user.username
      return next()
    } else {
      res.redirect('/welcome')
    }
  }

  //Login
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

  //Main
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

  app
    .route('/api/:user/save/:data')
    //Save a book to a user
    .post(saveBook)
    //Delete a user's book
    .delete(removeBook)
  //See a user's books
  app.route('/api/:user/library').get(userShelves)
  //See all books
  app.route('/api/library').get(library)
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
    res.json(name_view)
  })
  //Private (no client UI option)
  //Remove all stored books
  app.use('/api/burn', curseOfAlexandria)
  //Remove all users
  app.use('/api/purge', genocide)
}
