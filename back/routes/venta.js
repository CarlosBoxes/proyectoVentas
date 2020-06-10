var express = require('express');
var VentaController = require('../controllers/VentaController')

var api = express.Router();

api.post('/venta/registrar',VentaController.registrar);
api.get('/venta/datos/:id',VentaController.datos_venta);
api.get('/ventas',VentaController.listar_ventas);
api.get('/venta/:id',VentaController.detalles_venta);


module.exports = api;