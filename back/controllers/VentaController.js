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

    Venta.findById(id,(err,data_venta)=>{
        if (data_venta){
            DetalleVenta.find({venta: id},(err,data_detalleventa)=>{
                if(data_detalleventa){
                    res.status(200).send({
                        venta: data_venta,
                        detalles: data_detalleventa
                    })
                }
            })
        }else{
            
        }
    });
}

module.exports = {
    registrar,
    datos_venta,
}