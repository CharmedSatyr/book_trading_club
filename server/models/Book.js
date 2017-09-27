'use strict'

import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Book = new Schema({
  author: String,
  title: String,
  publication: Number,
  cover: String,
  olkey: String,
  requested: {
    type: Boolean,
    default: false
  },
  owner: String
})

export default mongoose.model('Book', Book)
