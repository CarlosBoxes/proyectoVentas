var Venta = require('../models/venta');
var DetalleVenta = require('../models/detalleventa');
var Producto = require ('../models/producto')

function registrar (req,res){
    let data = req.body;
    var venta = new Venta();

    venta.idcliente = data.idcliente;
    venta.iduser = data.iduser;

    venta.save((err,venta_saved) => {
        if (venta_saved){
            let detalles = data.detalles;

            detalles.forEach((element,index) => {
                var detalleventa = new DetalleVenta();

                detalleventa.idproducto = element.idproducto;
                detalleventa.cantidad = element.cantidad;
                detalleventa.venta = venta_saved._id;

                detalleventa.save((err,detalle_saved) => {
                    if(detalle_saved){
                        Producto.findById(detalleventa.idproducto,(err,producto_data)=>{
                            if(producto_data){
                                Producto.findByIdAndUpdate({_id: producto_data._id},{stock: parseInt(producto_data.stock) - parseInt(element.cantidad)},(err,producto_updated)=>{
                                    res.end();
                                })
                            }else{
                                res.send('No se encontro el producto')
                            }
                        })
                    }else{
                        res.send('No se pudo registrar los datos')
                    }
                })
            });

        }else{
            res.send('No se pudo registrar los datos')
        }
    });

}

function datos_venta (req,res){
    var id = req.params['id'];
    Venta.findById(id).populate('idcliente').populate('iduser').exec((err,data_venta)=>{
        
        if (data_venta){
            DetalleVenta.find({venta: id}).populate('idproducto').exec((err,data_detalleventa)=>{
                if(data_detalleventa){
                    res.status(200).send({data: 
                        {
                            venta: data_venta,
                            detalles: data_detalleventa
                        }
                    })
                }
            });
        }else{
            
        }
    });
}

function listar_ventas (req,res){
    Venta.find().populate('idcliente').populate('iduser').exec((err,data_Ventas)=> {
        if(data_Ventas){
            res.status(200).send({ventas: data_Ventas})
        }else {
            res.status(404).send({message: "NO hay ningun registro de ventas"});
        }
    })

}

function detalles_venta (req,res){
    var id = req.params['id'];

    DetalleVenta.find({venta: id}).populate('idproducto').exec((err,data_detalles) => {
        if (data_detalles){
            res.status(200).send({detalles: data_detalles})
        }else{
            res.status(404).send({message: "NO hay ningun registro de detalles"});
        }
    }
    );
}

module.exports = {
    registrar,
    datos_venta,
    listar_ventas,
    detalles_venta,
}