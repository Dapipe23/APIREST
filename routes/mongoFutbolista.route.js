const { Router } = require('express');

const { check} = require('express-validator')

//const Role = require('../models/role')

const {validarCampos} = require('../middlewares/validar-campos')

const {validarJWT} = require('../middlewares/validar-jwt')

const { existeFutbolistaPorId } = require('../helpers/db-validators');
 
const { FutbolistaGet,
        FutbolistaIdGet,
        FutbolistaPut,
        FutbolistaPost,
        FutbolistaDelete
    } = require('../controllers/mongoFutbolista.controller');

const router = Router();

router.get('/',[
    validarJWT, //Midlleware para el Tokens
    validarCampos
],
FutbolistaGet );

router.get('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeFutbolistaPorId),
    validarCampos
], FutbolistaIdGet);

router.put('/:id',[
    validarJWT, //Midlleware para el Tokens
    check('id','No es un Id Valido...').isMongoId(),
    check('id').custom(existeFutbolistaPorId),
    //check('rol').custom(esRoleValido),
    validarCampos
],FutbolistaPut );


router.post('/', [
    validarJWT, // Middleware para el Tokens (descomenta si lo necesitas)
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('posicion', 'La posicion es obligatoria').not().isEmpty(),
    check('nacionalidad', 'La nacionalidad es obligatoria').not().isEmpty(),
    check('equipo', 'El equipo es obligatotio').not().isEmpty(),
    validarCampos
], FutbolistaPost);



router.delete('/:id',[
    validarJWT, //Midlleware para el Tokens    
    check('id','No es un Id Valido...').isMongoId(),
    check('id').custom(existeFutbolistaPorId),
    validarCampos
], FutbolistaDelete );


//router.patch('/', usuariosPatch );


module.exports = router;