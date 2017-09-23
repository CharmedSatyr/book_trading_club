'use strict'

import mongoose from 'mongoose'
const Schema = mongoose.Schema

const User = new Schema({
  username: String,
  password: String,
  location: String,
  shelves: []
})

export default mongoose.model('User', User)
