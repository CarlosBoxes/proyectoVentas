var express = require('express');
var ProductoController = require('../controllers/ProductoController');
var multiparty = require('connect-multiparty');
var path = multiparty({uploadDir: './uploads/productos'});

var api = express.Router();

api.post('/producto/registrar',path,ProductoController.registrar);
api.get('/productos/:titulo?',ProductoController.listar);
api.put('/producto/editar/:id/:img',path,ProductoController.editar);
api.get('/producto/registro/:id',ProductoController.obtener_producto);
api.delete('/producto/:id',path,ProductoController.eliminar);
api.put('/producto/stock/:id',path,ProductoController.update_stock);
api.get('/producto/img/:img',ProductoController.get_img);

module.exports = api;