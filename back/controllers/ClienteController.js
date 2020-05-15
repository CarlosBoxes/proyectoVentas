var Cliente = require('../models/cliente');

function registrar (req,res) {
    var data = req.body;
    var cliente = new Cliente();

    cliente.nombres=data.nombres;
    cliente.correo=data.correo;
    cliente.puntos=10;


    cliente.save((err,cliente_saved)=>{
        if (err){
            res.status(500).send({error: 'Error en el servidor.'});
        }else{
            if (cliente_saved){
                res.status(200).send({cliente: cliente_saved});
            }else{
                res.status(403).send({message: 'La cliente no se pudo registrar.'});
            }
        }
    })
}

function editar (req,res){
    let id = req.params['id'];
    let data = req.body

    Cliente.findByIdAndUpdate({_id: id}, {nombres: data.nombres, correo: data.correo},(err,cliente_edited)=>{
        if (err){
            res.status(500).send({error: 'Error en el servidor.'});
        }else{
            if (cliente_edited)
            {
                res.status(200).send({cliente: cliente_edited});
            }else{
                res.status(403).send({message: 'La cliente no se pudo actualizar'});
            }
        }
    })
}

function eliminar (req,res){
    var id = req.params['id'];
    
    Cliente.findByIdAndRemove({_id: id}, (err,cliente_deleted)=>{
        if (err){
            res.status(500).send({error: 'Error en el servidor.'});
        }else{
            if (cliente_deleted)
            {
                res.status(200).send({cliente: cliente_deleted});
            }else{
                res.status(403).send({message: 'El cliente  no se pudo elimnar'})
            }
        }
    })
}

module.exports = {
    registrar,
    editar,
    eliminar,
}