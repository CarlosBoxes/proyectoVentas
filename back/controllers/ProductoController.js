var Producto = require('../models/producto');

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

    Producto.find({titulo: new RegExp(titulo,'i')},(err,productos_listado)=>{
        if (err){
            res.status(500).send({message: 'Error en el servidor'});
        }else{
            if(productos_listado){
                res.status(200).send({productos: productos_listado});
            }else{
                res.status(403).send({message: 'no hay ningun registro con ese titulo'})
            }
        }
    })
}

module.exports = {
    registrar,
    listar,
}
