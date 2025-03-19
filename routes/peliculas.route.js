const { Router } = require('express');
const {
    peliculaGet,
    peliculaIdGet,
    peliculaPost,
    peliculaPut,
    peliculaDelete,
} = require('../controllers/peliculas.controller');

const router = Router();

router.get('/', peliculaGet); // GET /api/pelicula
router.get('/:id', peliculaIdGet); // GET /api/pelicula/1
router.post('/', peliculaPost); // POST /api/pelicula
router.put('/:id', peliculaPut); // PUT /api/pelicula/1
router.delete('/:id', peliculaDelete);

module.exports = router;