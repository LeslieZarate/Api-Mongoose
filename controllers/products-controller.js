const Product = require('../models/products');

module.exports = {
  getAllProducts: async (req, res) => {
    const products = await Product.find({});
    return res.send(products);
  },
  getByIdProduct: async (req, res) => {
    try {
      const { id } = req.params;
      console.info(id);
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).send('no existe');
      }
      res.send(product);
    } catch (e) {
      return res.status(404).send('no existe');
    }
  },
  createProduct: async (req, res) => {
    const {
      name, price, pictures, category, description,
    } = req.body;
    const newProduct = new Product({
      name,
      price,
      pictures,
      category,
      description,
    });
    const product = await newProduct.save();

    return res.status(200).send(product);
  },
  updateByIdProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).send('no se encontro products');
      }
      await Product.updateOne({ _id: id }, req.body);
      const productUpdate = await Product.findById(id);
      return res.send(productUpdate);
    } catch (e) {
      return res.status(404).send('no se encontro products');
    }
  },
  deleteByIdProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findByIdAndDelete(id);
      if (!product) {
        return res.status(404).send('no existe');
      }
      return res.send(product);
    } catch (e) {
      return res.status(404).send('no existe');
    }
  },
};
