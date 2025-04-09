const { Peliculas } = require('../models/mySqlPeliculas');

const getPeliculas = async (req, res) => {
    try {
        const peliculas = await Peliculas.findAll();
        res.json(peliculas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getPeliculaById = async (req, res) => {
    try {
        const pelicula = await Peliculas.findByPk(req.params.id);
        if (pelicula) {
            res.json(pelicula);
        } else {
            res.status(404).json({ error: 'Pelicula not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createPelicula = async (req, res) => {
    try {
        const { nombre } = req.body;
        const peliculaExistente = await Peliculas.findOne({ where: { nombre } });
        if (peliculaExistente) {
            return res.status(400).json({ error: 'Pelicula already exists' });
        }
        const pelicula = await Peliculas.create(req.body);
        res.status(201).json(pelicula);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updatePelicula = async (req, res) => {
    try {
        const pelicula = await Peliculas.findByPk(req.params.id);
        if (pelicula) {
            await pelicula.update(req.body);
            res.json(pelicula);
        } else {
            res.status(404).json({ error: 'Pelicula not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deletePelicula = async (req, res) => {
    try {
        const pelicula = await Peliculas.findByPk(req.params.id);
        if (pelicula) {
            await pelicula.destroy();
            res.json({ message: 'Pelicula deleted' });
        } else {
            res.status(404).json({ error: 'Pelicula not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getPeliculas,
    getPeliculaById,
    createPelicula,
    updatePelicula,
    deletePelicula,
};