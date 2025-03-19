const { DataTypes } = require('sequelize');
const { bdmysql } = require('../database/MySqlConnection');

const Heroes = bdmysql.define('heroes', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    nombre: {
        type: DataTypes.STRING(30),
        allowNull: false,
    },
    bio: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    img: {
        type: DataTypes.STRING(250),
        allowNull: false,
    },
    aparicion: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    casa: {
        type: DataTypes.STRING(20),
    },
}, {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
});

module.exports = {
    Heroes,
};