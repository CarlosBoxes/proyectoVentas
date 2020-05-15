var express = require('express');
var UserController = require('../controllers/UserController')

var api = express.Router();

api.post('/registrar',UserController.registrar)
api.post('/login',UserController.login)


module.exports = api;
