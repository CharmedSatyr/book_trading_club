'use strict'

/*** REGEX ***/
import validation from '../../common/validation.js'

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
    match: validation.location.regex,
    minlength: 1,
    required: true,
    type: String
  },
  password: {
    match: validation.password.regex,
    minlength: 8,
    required: true,
    type: String
  },
  username: {
    index: { unique: true },
    match: validation.username.regex,
    minlength: 1,
    required: true,
    type: String
  }
})

export default mongoose.model('User', User)
