const { Router } = require('express');

const { check} = require('express-validator')

//const Role = require('../models/role')

const {validarCampos} = require('../middlewares/validar-campos')

const {validarJWT} = require('../middlewares/validar-jwt')

const { existeContratacionPorId } = require('../helpers/db-validators');
 
const { ContratacionGet,
        ContratacionIdGet,
        ContratacionPut,
        ContratacionPost,
        ContratacionDelete
    } = require('../controllers/mongoContratacion.controller');

const router = Router();

router.get('/',[
    validarJWT, //Midlleware para el Tokens
    validarCampos
],
ContratacionGet );

router.get('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeContratacionPorId),
    validarCampos
], ContratacionIdGet);

router.put('/:id',[
    validarJWT, //Midlleware para el Tokens
    check('id','No es un Id Valido...').isMongoId(),
    check('id').custom(existeContratacionPorId),
    //check('rol').custom(esRoleValido),
    validarCampos
],ContratacionPut );


router.post('/', [
    validarJWT, // Middleware para el Tokens (descomenta si lo necesitas)
    check('idjugador', 'El id es obligatorio').not().isEmpty(),
    check('idequipo', 'El id es obligatorio').not().isEmpty(),
    check('desde', 'La fecha de entrada es obligatoria').not().isEmpty(),
    check('hasta', 'La fecha de salida es obligatoria').not().isEmpty(),
    validarCampos
], ContratacionPost);



router.delete('/:id',[
    validarJWT, //Midlleware para el Tokens    
    check('id','No es un Id Valido...').isMongoId(),
    check('id').custom(existeContratacionPorId),
    validarCampos
], ContratacionDelete );


//router.patch('/', usuariosPatch );


module.exports = router;