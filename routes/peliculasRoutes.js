const express = require('express');
const {
    getPeliculas,
    getPeliculaById,
    createPelicula,
    updatePelicula,
    deletePelicula,
} = require('../controllers/peliculasController');

const router = express.Router();

router.get('/', getPeliculas);
router.get('/:id', getPeliculaById);
router.post('/', createPelicula);
router.put('/:id', updatePelicula);
router.delete('/:id', deletePelicula);

module.exports = router;