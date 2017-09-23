'use strict'

/*** ES ***/
import 'babel-polyfill'
import Promise from 'es6-promise'
Promise.polyfill()
require('isomorphic-fetch')

/*** EXPRESS ***/
import express from 'express'
const app = express()

/*** ENVIRONMENT ***/
const path = process.cwd()
import dotenv from 'dotenv'
dotenv.load()

/*** DEVELOPMENT TOOLS ***/
const DEV = process.env.NODE_ENV === 'development'
import morgan from 'morgan'
if (DEV) {
  app.use(morgan('dev'))
}

/*** VIEW ENGINE ***/
app.set('view engine', 'html')
app.engine('html', (path, option, cb) => {})

/*** ENABLE COMPRESSION ***/
const PROD = process.env.NODE_ENV === 'production'
import compression from 'compression'
if (PROD) {
  app.use(compression())
}

/*** MIDDLEWARE ***/
app.use('/js', express.static(path + '/dist/js')) //The first argument creates the virtual directory used in index.html
app.use('/styles', express.static(path + '/dist/styles'))
app.use('/img', express.static(path + '/dist/img'))

/*** MONGOOSE ***/
import mongoose from 'mongoose'
const db = mongoose.connection
mongoose.Promise = Promise
mongoose.connect(process.env.MONGO_URI, { useMongoClient: true }, (err, db) => {
  if (err) {
    console.error('Failed to connect to database!')
  } else {
    console.log('Connected to database.')
  }
})

/*** ROUTES ***/
import { routes } from './routes/index.server.js'
routes(app)

/*** WEB SOCKETS ***/
import http from 'http'
const server = http.createServer(app)
import socket from 'socket.io'
const io = socket(server)
import ioEvents from './routes/socket.server.js'
ioEvents(io)

/*** SERVE ***/
const port = process.env.PORT
server.listen(port, () => {
  console.log('Server is listening on port', port + '.')
})
