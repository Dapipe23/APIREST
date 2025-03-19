const { Sequelize } = require('sequelize');


const bdmysql = new Sequelize(
    'railway',
    'root',
    //ajustar el password de cada uno
    'olsXffWxZkisqgIfOceBMWNBIUhsdkfe',
    {
        //ajustar el host de cada uno   
        host: 'shortline.proxy.rlwy.net',
        //ajustar el puerto de cada uno
        port: '10751',
        dialect: 'mysql'
    }
);




module.exports = {
    bdmysql
}
