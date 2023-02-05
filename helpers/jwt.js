const jwt = require('jsonwebtoken');


const generarJWT = ( uid, name ) => {

    return new Promise( ( resolve, reject ) => {

        const payload = { uid, name };
        jwt.sign( payload, process.env.SECRET_JWT_SEED, {
            expiresIn:'10h'
            
        }, (error, token) => {

            if (error) {
                console.log(error);
                reject('Error al generar el token');
            };

            resolve( token );

        });

    })
};


module.exports = {
    generarJWT
}