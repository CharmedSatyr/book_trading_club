'use strict'
const path = process.cwd()
import {
  library,
  saveBook,
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
  //Auth check
  const permissions = (req, res, next) => {
    if (req.isAuthenticated()) {
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

  //API
  app.route('/api/search/:s').post(permissions, searchSubmit)
  app.route('/api/save/:data').post(permissions, saveBook)
  app.route('/api/library').get(library)
  app
    .route('/api/users')
    .get(viewUsers)
    .post(
      saveUser,
      passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/welcome'
      })
    )

  //Private (no client UI option)
  //Remove all stored books
  app.use('/api/burn', curseOfAlexandria)
  //Remove all users
  app.use('/api/purge', genocide)
}
