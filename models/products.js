const mongoose = require('mongoose');

const { Schema } = mongoose;

const productSchema = new Schema({
  name: String,
  pictures: String,
  price: Number,
  category: {
    type: String,
    enum: ['computers', 'phones', 'accesories'],
  },
  description: String,
});

module.exports = mongoose.model('Product', productSchema);
