const { Router } = require('express');
const { check } = require('express-validator');

const { registrarUsuario, logeandoUsuario, validarToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();





router.post('/register', [
    check('name', 'El name es obligatorio' ).not().isEmpty(),
    check('correo', 'El correo no es valido' ).isEmail(),
    check('password', 'La contraseña no es valida' ).isLength({ min: 6 }),
    validarCampos,
], registrarUsuario );


router.post('/login', [
    check('correo', 'El correo no es valido' ).isEmail(),
    check('password', 'La contraseña no es valida' ).isLength({ min: 6 }),
    validarCampos,
], logeandoUsuario );


router.get('/renew', validarJWT , validarToken );





module.exports = router;