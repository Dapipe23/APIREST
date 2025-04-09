const { Router } = require('express');

const { check} = require('express-validator')

//const Role = require('../models/role')

const {validarCampos} = require('../middlewares/validar-campos')

const {validarJWT} = require('../middlewares/validar-jwt')

const { existeHeroePorId } = require('../helpers/db-validators');
 
const { heroesGet,
        heroeIdGet,
        heroesPut,
        heroesPost,
        heroesDelete
    } = require('../controllers/mongoHeroe.controller');

const router = Router();

router.get('/',[
    validarJWT, //Midlleware para el Tokens
    validarCampos
],
heroesGet );

router.get('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeHeroePorId),
    validarCampos
], heroeIdGet);

router.put('/:id',[
    validarJWT, //Midlleware para el Tokens
    check('id','No es un Id Valido...').isMongoId(),
    check('id').custom(existeHeroePorId),
    //check('rol').custom(esRoleValido),
    validarCampos
],heroesPut );


router.post('/', [
    validarJWT, // Middleware para el Tokens (descomenta si lo necesitas)
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('bio', 'La biografía es obligatoria').not().isEmpty(),
    check('img', 'La imagen es obligatoria').not().isEmpty(),
    check('aparicion', 'La fecha de aparición es obligatoria').not().isEmpty(),
    check('casa', 'La casa es obligatoria').isIn(['Marvel', 'DC']),
    check('estado', 'El estado debe ser un valor booleano').isBoolean(),
    validarCampos
], heroesPost);



router.delete('/:id',[
    validarJWT, //Midlleware para el Tokens    
    check('id','No es un Id Valido...').isMongoId(),
    check('id').custom(existeHeroePorId),
    validarCampos
], heroesDelete );


//router.patch('/', usuariosPatch );


module.exports = router;