var express = require('express');
var ProductoController = require('../controllers/ProductoController');
var multiparty = require('connect-multiparty');
var path = multiparty({uploadDir: './uploads/productos'});

var api = express.Router();

api.post('/producto/registrar',path,ProductoController.registrar);
api.get('/productos/:titulo?',ProductoController.listar);

module.exports = api;