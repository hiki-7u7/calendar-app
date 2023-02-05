const { response, request } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../model/Usuario');
const { generarJWT } = require('../helpers/jwt');


const registrarUsuario = async( req = request, res = response ) => {

    const { correo, password } = req.body

    try {

        let usuario = await Usuario.findOne({ correo });

        if( usuario ){
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ya esta registrado'
            });
        };

        usuario = new Usuario( req.body );

        // ENCRIPTAR CONTRASEÑA
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );

        await usuario.save();

        // GENERAR JWT
        const token =  await generarJWT( usuario.id, usuario.name );

    
        res.status(201).json({
            ok: true,
            usuario,
            token
        });
        
    } catch (error){

        res.status(500).json({
            ok: false,
            msg: 'Error interno hable con el administrador'
        });

    }
};


const logeandoUsuario = async( req = request, res = response ) => {

    const { correo, password } = req.body;

    try {

        const usuario = await Usuario.findOne({ correo });

        if( !usuario ){
            return res.status(400).json({
                ok: false,
                msg: 'EL usuario no esta registrado'
            });
        };

        const validarPassword = bcrypt.compareSync( password, usuario.password );

        if (!validarPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña incorrecta'
            });
        }

        // GENERAR JWT
        const token =  await generarJWT( usuario.id, usuario.name );

        res.status(200).json({
            ok: true,
            usuario,
            token
        });

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error interno hable con el administrador'
        });

    }

  
};


const validarToken = async( req = request, res = response ) => {
    
    const { uid, name } = req
   

    try {
        // GENERAR JWT
        const token = await generarJWT( uid, name );

        res.status(200).json({
            ok: true,
            uid,
            name,
            token
        });

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error interno hable con el administrador // al generar el JWT'
        })
    }

};


module.exports = {
    registrarUsuario,
    logeandoUsuario,
    validarToken
}