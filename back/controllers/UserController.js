var User = require('../models/user');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../helpers/jwt');

function registrar (req,res){
    var params = req.body;
    var user = new User();

    if (params.password){
        bcrypt.hash(params.password, null,null,function(err,hash){
            if (hash)
            {
                user.password=hash;
                user.nombres = params.nombres;
                user.apellidos = params.apellidos;
                user.email = params.email;
                user.role = params.role;

                user.save((err,user_saved)=>{
                    if (err){
                        res.status(500).send({error: 'No se ingreso el usuario'});
                    }else{
                        res.status(200).send({user: user_saved});
                    }
                })

            }
        })
    }else{
        res.status(403).send({error: 'No ingreso la contraseña.'});
    }
}

function login (req,res){  
    var data = req.body
    User.findOne({email: data.email},(err,user_data)=>{
        if (err){
            res.status(500).send({message: 'Error en el servidor'});
        }else{
            if(user_data){
                bcrypt.compare(data.password,user_data.password,function(err,check){
                    if(check)
                    {
                        if (data.gettoken){
                            res.status(200).send({
                                jwt: jwt.createToken(user_data),
                                user: user_data,
                                
                            });
                        }else{
                            res.status(200).send({
                                user: user_data,
                                message: 'no token',
                                jwt: jwt.createToken(user_data),
                            });
                        }
                    }else{
                        res.status(403).send({message: 'Las contraseñas o correo no coinciden.'});
                    }
                });
            }else{
                res.status(403).send({message: 'El correo no existe'});
            }
        }
    })
}

function get_usuarios (req,res){
    User.find((err,usuarios_data)=>{
        if(usuarios_data){
            res.status(200).send({usuarios: usuarios_data});
        }else{
            res.status(403).send({message: 'No hay Usuarios en la Base de datos'})
        }
    })
}

function get_usuario (req,res){
    var id = req.params['id'];
    User.findById(id,(err,usuarios_data)=>{
        if(usuarios_data){
            res.status(200).send({usuario: usuarios_data});
        }else{
            res.status(403).send({message: 'No hay Usuarios en la Base de datos'})
        }
    })
}

function editar (req,res){
    let id = req.params['id'];
    let data = req.body;

    if (data.password)
    {
            bcrypt.hash(data.password, null,null,function(err,hash){
                if (hash)
                {
                    User.findByIdAndUpdate({_id: id}, {nombres: data.nombres,apellidos: data.apellidos,email: data.email, role: data.role, password: hash},(err,usuario_edited)=>{
                        if (err){
                            res.status(500).send({error: 'Error en el servidor.'});
                        }else{
                            if (usuario_edited)
                            {
                                res.status(200).send({usuario: usuario_edited});
                            }else{
                                res.status(403).send({message: 'El usuario no se pudo actualizar'});
                            }
                        }
                    });      
                }
            })     
    }else{
        User.findByIdAndUpdate({_id: id}, {nombres: data.nombres,apellidos: data.apellidos,email: data.email, role: data.role},(err,usuario_edited)=>{
            if (err){
                res.status(500).send({error: 'Error en el servidor.'});
            }else{
                if (usuario_edited)
                {
                    res.status(200).send({usuario: usuario_edited});
                }else{
                    res.status(403).send({message: 'El usuario no se pudo actualizar'});
                }
            }
        });

    }
}

function eliminar (req,res){
    var id = req.params['id'];
    
    User.findByIdAndRemove({_id: id}, (err,usuario_deleted)=>{
        if (err){
            res.status(500).send({error: 'Error en el servidor.'});
        }else{
            if (usuario_deleted)
            {
                res.status(200).send({cliente: usuario_deleted});
            }else{
                res.status(403).send({message: 'El Usuario no se pudo elimnar'})
            }
        }
    })
}

module.exports = {
    registrar,
    login,
    get_usuarios,
    get_usuario,
    eliminar,
    editar
}

