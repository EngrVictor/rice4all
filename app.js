
const express = require('express');
const app = express();                 
const port = process.env.PORT || 3000;
const path = require('path')
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('./_helpers/jwt');
const errorHandler = require('./_helpers/error-handler');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static(path.join(__dirname, 'assets')));
app.use('/assets', express.static(process.cwd() + '/assets'));
// use JWT auth to secure the api
app.use(jwt());

// api routes
app.use('/users', require('./users/users.controller'));

// global error handler
app.use(errorHandler);




app.use(express.json());
app.set('view engine', 'ejs');

app.get('/users', function(req, res) {
  res.send(users)
});

app.get('/', function(req, res) {
  res.render('index')
});

app.get('/404', function(req, res) {
  res.render('404')
});

app.get('/about', function(req, res) {
  res.render('about')
});

app.get('/blog', function(req, res) {
  res.render('blog')
});

app.get('/contact', function(req, res) {
  res.render('contact')
});

app.get('/blog-single', function(req, res) {
  res.render('blog-single')
});

app.get('/login', function(req, res) {
  res.render('login')
});

app.get('/services', function(req, res) {
  res.render('services')
});

app.get('/signup', function(req, res) {
  res.render('signup')
});

app.get('/single', function(req, res) {
  res.render('single')
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});