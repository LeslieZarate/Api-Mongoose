const jwt = require('jsonwebtoken');
const moment = require('moment');

const { secret } = require('../config');

module.exports = (user) => {
  const payload = {
    sub: user._id,
    iat: moment().unix(),
    exp: moment().add(14, 'days').unix(),
  };
  return jwt.sign(payload, secret);
};
