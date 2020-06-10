var express = require('express');
var UserController = require('../controllers/UserController')

var api = express.Router();

api.post('/registrar',UserController.registrar);
api.post('/login',UserController.login);
api.get('/usuarios',UserController.get_usuarios);
api.get('/usuario/:id',UserController.get_usuario);
api.delete('/usuario/eliminar/:id',UserController.eliminar);
api.put('/usuario/editar/:id',UserController.editar);



module.exports = api;
