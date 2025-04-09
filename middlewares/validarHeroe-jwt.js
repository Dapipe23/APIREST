const jwt = require('jsonwebtoken');
const { request, response } = require("express");
const Heroe = require('../models/mongoHeroe.model')




const validarJWT = async (req = request, res = response, next) => {
    const token = req.header('x-token');


    if (!token) {
        return res.status(401).json({
            msg: ' No hay token en la peticion...'
        })
    }


    try {
        //Valida el token
        const {uid} = jwt.verify(token, process.env.SECRETPRIVATEKEY);


        //console.log(uid);
        const heroe = await Heroe.findById(uid)


        if(!heroe){
            return res.status(401).json({
                msg: 'Token no valido - heroe no existe en BD'
            })


        }


        if(!heroe.estado){
            return res.status(401).json({
                msg: 'Token no valido - Heroe con estado: false'
            })


        }


        req.heroe = heroe;


        next();


    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg: ' El token no es valido...'
        })


    }




    //console.log(token);


    //next();
}




module.exports = {
    validarJWT
}
