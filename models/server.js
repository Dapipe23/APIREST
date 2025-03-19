const express = require('express');
const cors = require('cors');
const { bdmysql } = require('../database/MySqlConnection');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.pathsMySql = {
            heroes: '/api/heroes',
            peliculas: '/api/peliculas',
            protagonistas: '/api/protagonistas',
        };

        this.dbConnection();

        this.middlewares();

        this.routes();
    }

    async dbConnection() {
        try {
            await bdmysql.authenticate();
            console.log('Conexión exitosa a MySQL.');
    
            const { Heroes } = require('../models/mySqlHeroes');
            const { pelicula } = require('../models/mySqlPeliculas');
            const { protagonista } = require('../models/mySqlProtagonista');
    
            await bdmysql.sync({ force: false });
            console.log('Modelos sincronizados correctamente.');
        } catch (error) {
            console.error('No se pudo conectar a la base de datos MySQL:', error);
        }
    }

    middlewares() {
        this.app.use(cors());

        this.app.use(express.json());

        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.pathsMySql.heroes, require('../routes/heroes.route'));

        this.app.use(this.pathsMySql.peliculas, require('../routes/peliculas.route'));

        this.app.use(this.pathsMySql.protagonistas, require('../routes/protagonista.route'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto', this.port);
        });
    }
}

module.exports = Server;