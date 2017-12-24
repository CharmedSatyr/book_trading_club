'use strict'

/*** REGEX ***/
import regex from '../../common/regex.js'

/*** MODEL ***/
import mongoose from 'mongoose'
const Schema = mongoose.Schema

const User = new Schema({
  created: {
    type: Date,
    required: true,
    default: new Date()
  },
  location: {
    match: regex.location,
    minlength: 1,
    required: true,
    type: String
  },
  password: {
    match: regex.password,
    minlength: 8,
    required: true,
    type: String
  },
  username: {
    index: { unique: true },
    match: regex.username,
    minlength: 1,
    required: true,
    type: String
  }
})

export default mongoose.model('User', User)
