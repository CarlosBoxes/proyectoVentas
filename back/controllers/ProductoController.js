var Producto = require('../models/producto');
var path = require('path')
var fs = require('fs')

function registrar(req,res){
    var data = req.body;
    if (req.files){
        var imagen_path = req.files.imagen.path;
        var name = imagen_path.split('\\');
        var name_imagen = name[2]

        var producto = new Producto();

        producto.titulo= data.titulo;
        producto.descripcion= data.descripcion;
        producto.imagen= name_imagen;
        producto.precio_compra= data.precio_compra;
        producto.precio_venta= data.precio_venta;
        producto.stock= data.stock;
        producto.idCategoria= data.idCategoria;
        producto.puntos= data.puntos;
        console.log(producto)
        producto.save((err,producto_saved)=>{
            
            if (err){
                res.status(500).send({message: 'Error en el servidor'});
            }else{
                if(producto_saved)
                {
                    res.status(200).send({producto: producto_saved})
                }else
                {
                    res.status(403).send({message: 'No se puedo almacenar el producto'})
                }
            }
        })

    }
    else{
        var producto = new Producto();
        producto.titulo= data.titulo;
        producto.descripcion= data.descripcion;
        producto.imagen= null;
        producto.precio_compra= data.precio_compra;
        producto.precio_venta= data.precio_venta;
        producto.stock= data.stock;
        producto.idCategoria= data.idCategoria;
        producto.puntos= data.puntos;
        console.log(producto)
        producto.save((err,producto_saved)=>{
            
            if (err){
                res.status(500).send({message: 'Error en el servidor'});
            }else{
                if(producto_saved)
                {
                    res.status(200).send({producto: producto_saved})
                }else
                {
                    res.status(403).send({message: 'No se puedo almacenar el producto'})
                }
            }
        })    }
}

function listar (req,res){
    var titulo = req.params['titulo'];

    Producto.find({titulo: new RegExp(titulo,'i')}).populate('idCategoria').exec((err,productos_listado)=>{
        if (err){
            res.status(500).send({message: 'Error en el servidor'});
        }else{
            if(productos_listado){
                res.status(200).send({productos: productos_listado});
            }else{
                res.status(403).send({message: 'no hay ningun registro con ese titulo'})
            }
        }
    });
}

function editar(req,res){
    var id = req.params['id'];
    var img = req.params['img'];
    var data = req.body;

    if (req.files)
    {
        fs.unlink('./uploads/productos/'+img,(err)=>{
            if(err){
                throw err;
            }
        }
        )
        var imagen_path = req.files.imagen.path;
        var name = imagen_path.split('\\');
        var name_imagen = name[2]
        Producto.findByIdAndUpdate({_id: id},{
        titulo: data.titulo,
        descripcion: data.descripcion,
        imagen: name_imagen,
        precio_compra: data.precio_compra,
        precio_venta: data.precio_venta,
        stock: data.stock,
        idCategoria: data.idCategoria,
        puntos: data.puntos
    },(err,producto_edited)=>{
        if (err){
            res.status(500).send({message: 'Error en el servidor'});
        }else{
            if(producto_edited){
                res.status(200).send({producto: producto_edited});
            }else{
                res.status(403).send({message: 'No se pudo editar el producto.'})
            }
        }
    })
    }else{
        Producto.findByIdAndUpdate({_id: id},{
            titulo: data.titulo,
            descripcion: data.descripcion,
            precio_compra: data.precio_compra,
            precio_venta: data.precio_venta,
            stock: data.stock,
            idCategoria: data.idCategoria,
            puntos: data.puntos
        },(err,producto_edited)=>{
            if (err){
                res.status(500).send({message: 'Error en el servidor'});
            }else{
                if(producto_edited){
                    res.status(200).send({producto: producto_edited});
                }else{
                    res.status(403).send({message: 'No se pudo editar el producto.'})
                }
            }
        })
    }
}

function obtener_producto (req,res){
    var id = req.params['id'];
    console.log(id)

    Producto.findById({_id: id},(err,producto_data)=>{
        if (err){
            res.status(500).send({message: 'Error en el servidor'});
        }else{
            if(producto_data){
                res.status(200).send({producto: producto_data});
            }else{
                res.status(403).send({message: 'no hay ningun registro con ese id'})
            }
        }
    })
}

function eliminar (req,res){
    var id = req.params['id']

    Producto.findByIdAndRemove({_id: id},(err,producto_deleted)=>{
            if (err){
                res.status(500).send({message: 'Error en el servidor'});
            }else{
                if(producto_deleted){
                    fs.unlink('./uploads/productos/'+producto_deleted.imagen,(err)=>{
                        if(err){
                            throw err;
                        }
                    }
                    )
                    res.status(200).send({producto: producto_deleted});
                }else{
                    res.status(403).send({message: 'No se pudo eliminar el producto.'})
                }
            }
    });
}

function update_stock(req,res){
    var id= req.params['id'];
    var data = req.body;

    Producto.findById({_id: id},(err,producto_data)=>{
        if(producto_data){
            Producto.findByIdAndUpdate(id,{stock: parseInt(producto_data.stock)+parseInt(data.stock)},(err,producto_edited)=>{
                if(producto_edited){
                    res.status(200).send({producto: producto_edited});
                }else{
                    res.status(500).send(err);
                }
            })
        }
    })

}

function get_img (req,res){
    var img = req.params['img'];

    if (img != "null"){
        let path_img = './uploads/productos/'+img;
        res.status(200).sendFile(path.resolve(path_img));
    }else{
        let path_img = './uploads/productos/default.jpg'
        res.status(200).sendFile(path.resolve(path_img));
    }
}

module.exports = {
    registrar,
    listar,
    editar,
    obtener_producto,
    eliminar,
    update_stock,
    get_img,
}
