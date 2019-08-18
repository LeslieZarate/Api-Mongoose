const jwt = require('jsonwebtoken');
const moment = require('moment');
const { secret } = require('../config');
const User = require('../models/user');

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(403).send({ message: 'no tienes autorizacion' });
  }
  const token = authorization.split(' ')[1];
  jwt.verify(token, secret, (err, decodeToken) => {
    if (decodeToken.exp <= moment().unix()) {
      return res.status(401).send({ message: 'el token ha expirado' });
    }
    User.findById(decodeToken.sub)
      .then((user) => {
        if (!user) {
          return res.status(404).send({ message: 'no existe usuario' });
        }
        next();
      });
  });
};
