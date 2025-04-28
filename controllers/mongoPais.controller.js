const { response, request } = require("express");
const Pais = require("../models/mongoPais.model");

const PaisPost = async (req, res = response) => {
  const { nombre } = req.body;

  try {
    const existePais = await Pais.findOne({ nombre });
    if (existePais) {
      return res.status(400).json({
        msg: "Ya existe un país con ese nombre.",
      });
    }

    const pais = new Pais({ nombre });
    await pais.save();

    res.status(201).json({
      ok: true,
      msg: "País creado exitosamente",
      pais,
    });
  } catch (error) {
    console.error("Error al guardar país:", error);
    res.status(500).json({ ok: false, error: error.message });
  }
};

const PaisGet = async (req = request, res = response) => {
  try {
    const paises = await Pais.find();
    res.json({
      ok: true,
      data: paises,
    });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
};

const PaisIdGet = async (req, res = response) => {
  const { id } = req.params;
  try {
    const pais = await Pais.findById(id);

    if (!pais) {
      return res.status(404).json({
        ok: false,
        msg: "País no encontrado",
      });
    }

    res.json({
      ok: true,
      pais,
    });
  } catch (error) {
    console.error("Error al obtener país:", error);
    res.status(500).json({ ok: false, error: error.message });
  }
};

const PaisPut = async (req, res = response) => {
  const { id } = req.params;
  const { _id, ...resto } = req.body;

  try {
    const pais = await Pais.findByIdAndUpdate(id, resto, { new: true });
    res.json({
      ok: true,
      msg: "País actualizado correctamente",
      pais,
    });
  } catch (error) {
    console.error("Error al actualizar país:", error);
    res.status(500).json({ ok: false, error: error.message });
  }
};

const PaisDelete = async (req, res = response) => {
  const { id } = req.params;

  try {
    const pais = await Pais.findByIdAndDelete(id);
    res.json({
      ok: true,
      msg: "País eliminado correctamente",
      pais,
    });
  } catch (error) {
    console.error("Error al eliminar país:", error);
    res.status(500).json({ ok: false, error: error.message });
  }
};

module.exports = {
  PaisPost,
  PaisGet,
  PaisIdGet,
  PaisPut,
  PaisDelete,
};
