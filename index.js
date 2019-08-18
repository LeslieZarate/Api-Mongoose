const express = require('express');
const mongoose = require('mongoose');
const hbs = require('express-handlebars');

const config = require('./config');
const routerProducts = require('./routes/products');


const app = express();

const { port, dbUrl } = config;

app.set('config', config);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//  método incorporado en express para reconocer el objeto de
// solicitud entrante como un objeto JSON;

app.engine('.hbs', hbs({
  defaultLayout: 'default',
  extname: '.hbs',
}));
app.set('view engine', '.hbs');

app.use('/', routerProducts);
app.get('/login', (req, res) => {
  res.render('login');
});
app.get('/lista', (req, res) => {
  res.render('products');
});

mongoose.connect(dbUrl, { useNewUrlParser: true })
  .then((db) => {
    console.info(`DataBase connected ${db}`);
    app.listen(port, () => {
      console.info(`App listening on port ${port}`);
    });
  })
  .catch((e) => {
    console.info(e);
  });
