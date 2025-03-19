const { Router } = require('express');
const {
    protagonistaGet,
    protagonistaIdGet,
    protagonistaPost,
    protagonistaPut,
    protagonistaDelete,
} = require('../controllers/protagonista.controller');

const router = Router();

router.get('/', protagonistaGet);
router.get('/:id', protagonistaIdGet);
router.post('/', protagonistaPost);
router.put('/:id', protagonistaPut);
router.delete('/:id', protagonistaDelete);

module.exports = router;