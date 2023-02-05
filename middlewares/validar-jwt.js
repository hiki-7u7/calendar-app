const { response } = require('express');
const jwt = require('jsonwebtoken');


const validarJWT = ( req, res = response, next ) => {

    const token = req.header('x-token');

    if (!token) {
        return res.status(400).json({
            ok: false,
            msg: 'Falta el token'
        });
    };

    try {

        const payload = jwt.verify( token, process.env.SECRET_JWT_SEED );
    
        req.uid = payload.uid;
        req.name = payload.name;
    
        next();
        
    } catch (error) {

        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'El token enviado ah sido modificado o es erroneo'
        })
    }

};

module.exports = {
    validarJWT
}