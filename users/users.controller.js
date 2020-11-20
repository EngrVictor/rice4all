const express = require('express');
const router = express.Router();
const userService = require('./user.service');
const session = require('express-session');
const flash = require('connect-flash');
const errorHandler = require('../_helpers/error-handler');
const app = express();
app.use(flash());

app.use(session({
    secret: "secret",
    cookie: {maxAge: 60000},
    resave: false,
    saveUninitialized: false
}));

app.use(errorHandler);


// routes
router.post('/authenticate', authenticate);
router.post('/register', register);
router.get('/', getAll);
router.get('/current', getCurrent);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => {
            if (user) {
                res.redirect('/')
            }else {
                res.status('400');
                next(err);
                res.redirect('/login');
                // res.render('login', { message: flash('h')})
            }
        })      
        .catch(err => next(err));
    }
function register(req, res, next) {
    userService.create(req.body)
        .then(() => res.redirect('/'))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getCurrent(req, res, next) {
    userService.getById(req.user.sub)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function getById(req, res, next) {
    userService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    userService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    userService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}