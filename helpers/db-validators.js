const { Usuario} = require("../models");

const existeUsuarioPorId = async (id) => {
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
      throw new Error(`El id no existe ${id}`);
    }
  };

const { Heroe} = require("../models");

const existeHeroePorId = async (id) => {
    const existeHeroe = await Heroe.findById(id);
    if (!existeHeroe) {
      throw new Error(`El id no existe ${id}`);
    }
  }; 

  module.exports = {
     existeUsuarioPorId,
     existeHeroePorId
   };
  