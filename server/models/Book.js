'use strict'

import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Book = new Schema({
  author: String,
  cover: String,
  olkey: String,
  owner: String,
  publication: Number,
  requested: {
    default: false,
    type: Boolean
  },
  requestor: String,
  title: String
})

export default mongoose.model('Book', Book)
