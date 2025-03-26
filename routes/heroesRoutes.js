const express = require('express');
const {
    getHeroes,
    getHeroeById,
    createHeroe,
    updateHeroe,
    deleteHeroe,
} = require('../controllers/heroesController');

const router = express.Router();

router.get('/', getHeroes);
router.get('/:id', getHeroeById);
router.post('/', createHeroe);
router.put('/:id', updateHeroe);
router.delete('/:id', deleteHeroe);

module.exports = router;