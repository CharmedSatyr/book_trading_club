'use strict'
const path = process.cwd()
import {
  library,
  saveBook,
  curseOfAlexandria
} from '../controllers/bookController.server.js'

import { saveUser } from '../controllers/userController.server.js'
import { searchSubmit } from '../controllers/searchController.server.js'

export const routes = app => {
  app.route('/').get((req, res) => {
    res.sendFile(path + '/dist/index.html')
  })

  app.route('/login').get((req, res) => {
    res.sendFile(path + '/dist/login.html')
  })

  app.route('/api/search/:s').post(searchSubmit)
  app.route('/api/save/:data').post(saveBook)
  app.route('/api/library').get(library)

  //Remove all stored books (no client UI option)
  app.use('/api/purge', curseOfAlexandria)

  app.route('/api/signup/:userData').post(saveUser)
}
