const express = require('express');

const api = express.Router();

const {
  getAllProducts, getByIdProduct, createProduct, updateByIdProduct, deleteByIdProduct,
} = require('../controllers/products-controller');

const { signIn, signUp } = require('../controllers/auth-controller');
const isAuth = require('../middleware/auth');

api.get('/products', isAuth, getAllProducts);

api.get('/products/:id', getByIdProduct);

api.post('/products', createProduct);

api.put('/products/:id', updateByIdProduct);

api.delete('/products/:id', deleteByIdProduct);

api.post('/signUp', signUp);
api.post('/signIn', signIn);

module.exports = api;
