const { Router } = require('express');
const { check } = require('express-validator');
const { isDate } = require('../helpers/isDate');

const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();
router.use( validarJWT );


// Obtener eventos
router.get('/', getEvents );

// Crear evento
router.post('/createEvent', [
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('start', 'La fecha no es valida').custom( isDate ),
    check('end', 'La fecha no es valida').custom( isDate ),
    validarCampos
], createEvent );

// Actualizar evento
router.put('/updateEvent/:id', [
    check('id', 'No es un id de mongo valido').isMongoId(),
    validarCampos
],updateEvent );

//Eliminar evento
router.delete('/deleteEvent/:id', deleteEvent );


module.exports = router;