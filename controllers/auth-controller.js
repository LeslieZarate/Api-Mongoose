const bcrypt = require('bcrypt');
const User = require('../models/user');
const createToken = require('../services/createToken');

module.exports = {
  // crear cuenta
  signUp: async (req, res) => {
    const { email, password, roles } = req.body;
    if (!email || !password) {
      return res.status(400).send('bad request');
    }
    const userSignUp = new User({
      email,
      password: bcrypt.hashSync(password, 10),
      roles,
    });
    const user = await userSignUp.save();
    return res.send({ token: createToken(user) });
  },
  signIn: async (req, res) => {
    const { email, password } = req.body;
    console.info(req.body);
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).send({ message: 'no existe cuenta' });
    } else if (!bcrypt.compareSync(password, user.password)) {
      res.status(401).send({ message: 'password incorrecto' });
    } else {
      res.send({ token: createToken(user) });
    }
  },
};
