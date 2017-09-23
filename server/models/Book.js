'use strict'

import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Book = new Schema({
  author: String,
  title: String,
  publication: Number,
  cover: String,
  tag: String
})

export default mongoose.model('Book', Book)
