const { response, request } = require('express');
const { protagonista } = require('../models/mySqlProtagonista');
const { Heroes } = require('../models/mySqlHeroes');
const { pelicula } = require('../models/mySqlPeliculas');

const protagonistaGet = async (req, res = response) => {
    try {
        const protagonistas = await protagonista.findAll({
            include: [
                { model: Heroes, as: 'heroe' },
                { model: pelicula, as: 'pelicula' },
            ],
        });

        res.json({
            ok: true,
            data: protagonistas,
        });
    } catch (error) {
        console.error('Error en protagonistaGet:', error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador',
            err: error.message,
        });
    }
};

const protagonistaIdGet = async (req, res = response) => {
    const { id } = req.params;
    try {
        const unProtagonista = await protagonista.findByPk(id, {
            include: [
                { model: Heroes, as: 'heroe' },
                { model: pelicula, as: 'pelicula' },
            ],
        });

        if (!unProtagonista) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un protagonista con el id: ' + id,
            });
        }

        res.json({
            ok: true,
            data: unProtagonista,
        });
    } catch (error) {
        console.error('Error en protagonistaIdGet:', error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador',
            err: error.message,
        });
    }
};

const protagonistaPost = async (req, res = response) => {
    try {
        const { idheroe, idpelicula, rol, descripcion, orden_aparicion } = req.body;
        const existeHeroe = await Heroes.findByPk(idheroe);
        const existePelicula = await pelicula.findByPk(idpelicula);

        if (!existeHeroe || !existePelicula) {
            return res.status(400).json({
                ok: false,
                msg: 'El héroe o la película no existen',
            });
        }

        const existeProtagonista = await protagonista.findOne({
            where: { idheroe, idpelicula },
        });

        if (existeProtagonista) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un protagonista con este héroe y película',
            });
        }

        const nuevoProtagonista = await protagonista.create({
            idheroe,
            idpelicula,
            rol,
            descripcion,
            orden_aparicion,
        });

        res.status(201).json({
            ok: true,
            mensaje: 'Protagonista creado',
            data: nuevoProtagonista,
        });
    } catch (error) {
        console.error('Error en protagonistaPost:', error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador',
            err: error.message,
        });
    }
};

const protagonistaPut = async (req, res = response) => {
    const { id } = req.params;
    const { idheroe, idpelicula, rol, descripcion, orden_aparicion } = req.body;
    try {
        console.log('ID del protagonista a actualizar:', id);

        const protagonistaActualizado = await protagonista.findByPk(id);
        if (!protagonistaActualizado) {
            console.log('Protagonista no encontrado');
            return res.status(404).json({
                ok: false,
                msg: 'No existe un protagonista con el id: ' + id,
            });
        }

        const existeHeroe = await Heroes.findByPk(idheroe);
        const existePelicula = await pelicula.findByPk(idpelicula);

        if (!existeHeroe || !existePelicula) {
            console.log('Héroe o película no encontrados');
            return res.status(400).json({
                ok: false,
                msg: 'El héroe o la película no existen',
            });
        }

        await protagonistaActualizado.update({ idheroe, idpelicula, rol, descripcion, orden_aparicion });
        console.log('Protagonista actualizado:', protagonistaActualizado);

        res.json({
            ok: true,
            msg: 'Protagonista actualizado',
            data: protagonistaActualizado,
        });
    } catch (error) {
        console.error('Error en protagonistaPut:', error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador',
            err: error.message,
        });
    }
};

const protagonistaDelete = async (req, res = response) => {
    const { id } = req.params;
    try {
        const protagonistaEliminado = await protagonista.findByPk(id);
        if (!protagonistaEliminado) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un protagonista con el id: ' + id,
            });
        }

        await protagonistaEliminado.destroy();

        res.json({
            ok: true,
            msg: 'Protagonista eliminado',
            data: protagonistaEliminado,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador',
            err: error,
        });
    }
};

module.exports = {
    protagonistaGet,
    protagonistaIdGet,
    protagonistaPost,
    protagonistaPut,
    protagonistaDelete,
};