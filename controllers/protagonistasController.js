const { Protagonistas } = require('../models/mySqlProtagonistas');

const getProtagonistas = async (req, res) => {
    try {
        const protagonistas = await Protagonistas.findAll();
        res.json(protagonistas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getProtagonistaById = async (req, res) => {
    try {
        const protagonista = await Protagonistas.findByPk(req.params.id);
        if (protagonista) {
            res.json(protagonista);
        } else {
            res.status(404).json({ error: 'Protagonista not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createProtagonista = async (req, res) => {
    try {
        const { idheroe, idpelicula, Rol, Descripcion } = req.body;
        const protagonistaExistente = await Protagonistas.findOne({ where: { idheroe, idpelicula } });
        if (protagonistaExistente) {
            return res.status(400).json({ error: 'Protagonista already exists' });
        }
        const protagonista = await Protagonistas.create({ idheroe, idpelicula, Rol, Descripcion });
        res.status(201).json(protagonista);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateProtagonista = async (req, res) => {
    try {
        const protagonista = await Protagonistas.findByPk(req.params.id);
        if (protagonista) {
            await protagonista.update(req.body);
            res.json(protagonista);
        } else {
            res.status(404).json({ error: 'Protagonista not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteProtagonista = async (req, res) => {
    try {
        const protagonista = await Protagonistas.findByPk(req.params.id);
        if (protagonista) {
            await protagonista.destroy();
            res.json({ message: 'Protagonista deleted' });
        } else {
            res.status(404).json({ error: 'Protagonista not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getProtagonistas,
    getProtagonistaById,
    createProtagonista,
    updateProtagonista,
    deleteProtagonista,
};