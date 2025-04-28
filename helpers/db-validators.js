const {Usuario} = require("../models");
const existeUsuarioPorId = async (id) => {
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
      throw new Error(`El id no existe ${id}`);
    }
  };

const {Heroe} = require("../models");
const existeHeroePorId = async (id) => {
    const existeHeroe = await Heroe.findById(id);
    if (!existeHeroe) {
      throw new Error(`El id no existe ${id}`);
    }
  }; 

const {Contratacion} = require("../models");
const existeContratacionPorId = async (id) => {
    const existeContratacion = await Contratacion.findById(id);
    if (!existeContratacion) {
      throw new Error(`El id no existe ${id}`);
    }
  }; 

const {Futbolista} = require("../models");
const existeFutbolistaPorId = async (id) => {
    const existeFutbolista = await Futbolista.findById(id);
    if (!existeFutbolista) {
      throw new Error(`El id no existe ${id}`);
    }
  };

const {Equipo} = require("../models");
const existeEquipoPorId = async (id) => {
    const existeEquipo = await Equipo.findById(id);
    if (!existeEquipo) {
      throw new Error(`El id no existe ${id}`);
    }
  };

const {Pais} = require("../models");
const existePaisPorId = async (id) => {
    const existePais = await Pais.findById(id);
    if (!existePais) {
      throw new Error(`El id no existe ${id}`);
    }
  };

module.exports = {
     existeUsuarioPorId,
     existeHeroePorId,
     existeContratacionPorId,
     existeFutbolistaPorId,
     existeEquipoPorId,
     existePaisPorId
   };
