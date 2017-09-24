'use strict'

import mongoose from 'mongoose'
const Schema = mongoose.Schema

const User = new Schema({
  username: { type: String, index: { unique: true } },
  password: {
    type: String,
    required: true,
    match: /(?=.*[a-zA-Z])(?=.*[0-9]+).*/,
    minlength: 12
  },
  created: {
    type: Date,
    required: true,
    default: new Date()
  },
  location: String,
  shelves: []
})

export default mongoose.model('User', User)
