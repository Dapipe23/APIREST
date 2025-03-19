const { response } = require('express');
const { pelicula } = require('../models/mySqlPeliculas');

const peliculaGet = async (req, res = response) => {
    try {
        const peliculas = await pelicula.findAll();
        res.json({
            ok: true,
            data: peliculas,
        });
    } catch (error) {
        console.error('Error en peliculaGet:', error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador',
            err: error.message,
        });
    }
};

const peliculaIdGet = async (req, res = response) => {
    const { id } = req.params;
    try {
        const unaPelicula = await pelicula.findByPk(id);
        if (!unaPelicula) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe una película con el id: ' + id,
            });
        }
        res.json({
            ok: true,
            data: unaPelicula,
        });
    } catch (error) {
        console.error('Error en peliculaIdGet:', error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador',
            err: error.message,
        });
    }
};

const peliculaPost = async (req, res = response) => {
    try {
        const { nombre } = req.body;

        const existePelicula = await pelicula.findOne({ where: { nombre } });
        if (existePelicula) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe una película con ese nombre: ' + nombre,
            });
        }

        const nuevaPelicula = await pelicula.create({ nombre });

        res.status(201).json({
            ok: true,
            mensaje: 'Película creada',
            data: nuevaPelicula,
        });
    } catch (error) {
        console.error('Error en peliculaPost:', error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador',
            err: error.message,
        });
    }
};

const peliculaPut = async (req, res = response) => {
    const { id } = req.params;
    const { nombre } = req.body;
    try {
        const peliculaActualizada = await pelicula.findByPk(id);
        if (!peliculaActualizada) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe una película con el id: ' + id,
            });
        }

        await peliculaActualizada.update({ nombre });

        res.json({
            ok: true,
            msg: 'Película actualizada',
            data: peliculaActualizada,
        });
    } catch (error) {
        console.error('Error en peliculaPut:', error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador',
            err: error.message,
        });
    }
};

const peliculaDelete = async (req, res = response) => {
    const { id } = req.params;
    try {
        const peliculaEliminada = await pelicula.findByPk(id);
        if (!peliculaEliminada) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe una película con el id: ' + id,
            });
        }

        await peliculaEliminada.destroy();

        res.json({
            ok: true,
            msg: 'Película eliminada',
            data: peliculaEliminada,
        });
    } catch (error) {
        console.error('Error en peliculaDelete:', error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador',
            err: error.message,
        });
    }
};

module.exports = {
    peliculaGet,
    peliculaIdGet,
    peliculaPost,
    peliculaPut,
    peliculaDelete,
};