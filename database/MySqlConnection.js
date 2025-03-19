const { Sequelize } = require('sequelize');


const bdmysql = new Sequelize(
    'railway',
    'root',
    //ajustar el password de cada uno
    'iYqjzvUUBcPpPPDBJoOisMNIJOOoNkdf',
    {
        //ajustar el host de cada uno
        host: 'yamabiko.proxy.rlwy.net',
        //ajustar el puerto de cada uno
        port: '31120',
        dialect: 'mysql'
    }
);




module.exports = {
    bdmysql
}
