const mongoose = require('mongoose')

const productShema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('product', productShema)