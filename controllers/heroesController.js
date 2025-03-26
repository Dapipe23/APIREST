const { Heroes } = require('../models/mySqlHeroes');

const getHeroes = async (req, res) => {
    try {
        const heroes = await Heroes.findAll();
        res.json(heroes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getHeroeById = async (req, res) => {
    try {
        const heroe = await Heroes.findByPk(req.params.id);
        if (heroe) {
            res.json(heroe);
        } else {
            res.status(404).json({ error: 'Heroe not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createHeroe = async (req, res) => {
    try {
        const heroe = await Heroes.create(req.body);
        res.status(201).json(heroe);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateHeroe = async (req, res) => {
    try {
        const heroe = await Heroes.findByPk(req.params.id);
        if (heroe) {
            await heroe.update(req.body);
            res.json(heroe);
        } else {
            res.status(404).json({ error: 'Heroe not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteHeroe = async (req, res) => {
    try {
        const heroe = await Heroes.findByPk(req.params.id);
        if (heroe) {
            await heroe.destroy();
            res.json({ message: 'Heroe deleted' });
        } else {
            res.status(404).json({ error: 'Heroe not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getHeroes,
    getHeroeById,
    createHeroe,
    updateHeroe,
    deleteHeroe,
};