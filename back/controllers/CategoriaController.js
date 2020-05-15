var Categoria = require('../models/categoria');

function registrar (req,res){
    var data = req.body;
    var categoria = new Categoria();

    categoria.titulo = data.titulo;
    categoria.descripcion = data.descripcion;
    categoria.save((err,categoria_saved)=>{
        if (err){
            res.status(500).send({error: 'Error en el servidor.'});
        }else{
            if (categoria_saved){
                res.status(200).send({categoria: categoria_saved});
            }else{
                res.status(403).send({message: 'La categoria no se pudo registrar.'});
            }
        }
    })
}

function obtener_categoria (req,res){
    var id = req.params['id'];

    Categoria.findById({_id: id},(err, categoria_data)=>{
        if (err){
            res.status(500).send({error: 'Error en el servidor.'});
        }else{
            if (categoria_data)
            {
                res.status(200).send({categoria: categoria_data});
            }else{
                res.status(403).send({message: 'No exite categoria'});
            }
        }
    })
}

function editar(req,res){
    var id = req.params['id'];
    var data = req.body

    Categoria.findByIdAndUpdate({_id: id}, {titulo: data.titulo, descripcion: data.descripcion},(err,categoria_edited)=>{
        if (err){
            res.status(500).send({error: 'Error en el servidor.'});
        }else{
            if (categoria_edited)
            {
                res.status(200).send({categoria: categoria_edited});
            }else{
                res.status(403).send({message: 'La categoria no se pudo actualizar'});
            }
        }
    })
}

function eliminar(req,res){
    var id = req.params['id'];
    var data = req.body
    
    Categoria.findByIdAndRemove({_id: id}, (err,categoria_deleted)=>{
        if (err){
            res.status(500).send({error: 'Error en el servidor.'});
        }else{
            if (categoria_deleted)
            {
                res.status(200).send({categoria: categoria_deleted});
            }else{
                res.status(403).send({message: 'La categoria no se pudo elimnar'})
            }
        }
    })
}

function listar(req,res){
    var nombre = req.params['nombre'];

    Categoria.find({titulo: new RegExp(nombre,'i')},(err,categoria_listado)=>{
        if (err){
            res.status(500).send({error: 'Error en el servidor.'});
        }else{
            if (categoria_listado)
            {
                res.status(200).send({categorias: categoria_listado});
            }else{
                res.status(403).send({message: 'No hay categorias que coincidan.'})
            }
        }    })
}


module.exports = {
    registrar,
    obtener_categoria,
    editar,
    eliminar,
    listar
}

