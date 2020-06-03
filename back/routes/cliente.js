var express = require('express');
var ClienteController = require('../controllers/ClienteController');


var api = express.Router();


api.post('/cliente',ClienteController.registrar)
api.put('/cliente/editar/:id',ClienteController.editar)
api.delete('/cliente/eliminar/:id', ClienteController.eliminar)
api.get('/clientes',ClienteController.listar)


module.exports = api;