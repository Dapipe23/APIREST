const { Router } = require('express');

const { check} = require('express-validator')

//const Role = require('../models/role')

const {validarCampos} = require('../middlewares/validar-campos')

const {validarJWT} = require('../middlewares/validar-jwt')

const { existePaisPorId } = require('../helpers/db-validators');
 
const { PaisGet,
        PaisIdGet,
        PaisPut,
        PaisPost,
        PaisDelete
    } = require('../controllers/mongoPais.controller');

const router = Router();

router.get('/',[
    validarJWT, //Midlleware para el Tokens
    validarCampos
],
PaisGet );

router.get('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existePaisPorId),
    validarCampos
], PaisIdGet);

router.put('/:id',[
    validarJWT, //Midlleware para el Tokens
    check('id','No es un Id Valido...').isMongoId(),
    check('id').custom(existePaisPorId),
    //check('rol').custom(esRoleValido),
    validarCampos
],PaisPut );


router.post('/', [
    validarJWT, // Middleware para el Tokens (descomenta si lo necesitas)
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], PaisPost);



router.delete('/:id',[
    validarJWT, //Midlleware para el Tokens    
    check('id','No es un Id Valido...').isMongoId(),
    check('id').custom(existePaisPorId),
    validarCampos
], PaisDelete );


//router.patch('/', usuariosPatch );


module.exports = router;