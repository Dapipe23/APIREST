const { DataTypes } = require('sequelize');
const { bdmysql } = require('../database/MySqlConnection');
const { Heroes } = require('../models/mySqlHeroes');
const { pelicula } = require('../models/mySqlPeliculas');

const protagonista = bdmysql.define('protagonistas', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    idheroe: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    idpelicula: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    rol: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    orden_aparicion: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
}, {
    freezeTableName: true,
    timestamps: false,
});

protagonista.belongsTo(Heroes, { foreignKey: 'idheroe', as: 'heroe' });
protagonista.belongsTo(pelicula, { foreignKey: 'idpelicula', as: 'pelicula' });

module.exports = {
    protagonista,
};