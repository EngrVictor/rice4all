
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path')
app.use(express.static(path.join(__dirname, 'assets')));

app.use('/assets', express.static(process.cwd() + '/assets'));
app.set('view engine', 'ejs');

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