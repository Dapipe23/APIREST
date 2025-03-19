const { DataTypes } = require('sequelize');
const { bdmysql } = require('../database/MySqlConnection');

const pelicula = bdmysql.define('peliculas', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    nombre: {
        type: DataTypes.STRING(250),
        allowNull: false,
    },
}, {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
});

module.exports = {
    pelicula,
};