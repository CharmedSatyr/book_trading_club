'use strict'
const path = process.cwd()
import {
  library,
  saveBook,
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
  app.route('/api/search/:s').post(searchSubmit)

  app.route('/api/:user/save/:data').post(saveBook)
  app.route('/api/:user/library').get(userShelves)
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

  app.route('/api/users/logged').get((req, res) => {
    res.json(name_view)
  })
  //Private (no client UI option)
  //Remove all stored books
  app.use('/api/burn', curseOfAlexandria)
  //Remove all users
  app.use('/api/purge', genocide)
}
