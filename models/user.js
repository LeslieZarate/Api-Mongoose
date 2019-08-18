const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  roles: {
    admin: {
      type: Boolean,
      default: false,
    },
  },
});

module.exports = mongoose.model('User', userSchema);
