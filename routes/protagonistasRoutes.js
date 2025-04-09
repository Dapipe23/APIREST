const express = require('express');
const {
    getProtagonistas,
    getProtagonistaById,
    createProtagonista,
    updateProtagonista,
    deleteProtagonista,
} = require('../controllers/protagonistasController');

const router = express.Router();

router.get('/', getProtagonistas);
router.get('/:id', getProtagonistaById);
router.post('/', createProtagonista);
router.put('/:id', updateProtagonista);
router.delete('/:id', deleteProtagonista);

module.exports = router;