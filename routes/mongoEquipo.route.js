const { Router } = require('express');

const { check} = require('express-validator')

//const Role = require('../models/role')

const {validarCampos} = require('../middlewares/validar-campos')

const {validarJWT} = require('../middlewares/validar-jwt')

const { existeEquipoPorId } = require('../helpers/db-validators');
 
const { EquipoGet,
        EquipoIdGet,
        EquipoPut,
        EquipoPost,
        EquipoDelete
    } = require('../controllers/mongoEquipo.controller');

const router = Router();

router.get('/',[
    validarJWT, //Midlleware para el Tokens
    validarCampos
],
EquipoGet );

router.get('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeEquipoPorId),
    validarCampos
], EquipoIdGet);

router.put('/:id',[
    validarJWT, //Midlleware para el Tokens
    check('id','No es un Id Valido...').isMongoId(),
    check('id').custom(existeEquipoPorId),
    //check('rol').custom(esRoleValido),
    validarCampos
],EquipoPut );


router.post('/', [
    validarJWT, // Middleware para el Tokens (descomenta si lo necesitas)
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('Pais', 'El pais es obligatorio').not().isEmpty(),
    validarCampos
], EquipoPost);



router.delete('/:id',[
    validarJWT, //Midlleware para el Tokens    
    check('id','No es un Id Valido...').isMongoId(),
    check('id').custom(existeEquipoPorId),
    validarCampos
], EquipoDelete );


//router.patch('/', usuariosPatch );


module.exports = router;