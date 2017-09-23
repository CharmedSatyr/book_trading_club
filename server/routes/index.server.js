'use strict'
const path = process.cwd()
import { library, saveBook } from '../controllers/bookController.server.js'
import { searchSubmit } from '../controllers/searchController.server.js'

export const routes = app => {
  app.route('/').get((req, res) => {
    res.sendFile(path + '/dist/index.html')
  })

  app.route('/api/search/:s').post(searchSubmit)
  app.route('/api/save/:data').post(saveBook)
  app.route('/api/library').get(library)
}
