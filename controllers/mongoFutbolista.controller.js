const { response, request } = require("express");
const Futbolista = require("../models/mongoFutbolista.model");

// POST - Crear un nuevo futbolista
const FutbolistaPost = async (req, res = response) => {
  const { nombre, posicion, nacionalidad, equipo } = req.body;

  try {
    const nuevoFutbolista = new Futbolista({ nombre, posicion, nacionalidad, equipo });
    await nuevoFutbolista.save();

    res.status(201).json({
      ok: true,
      msg: "Futbolista creado exitosamente",
      futbolista: nuevoFutbolista,
    });
  } catch (error) {
    console.error("Error al guardar Futbolista:", error);
    res.status(500).json({ ok: false, error: error.message });
  }
};

// GET - Obtener todos los futbolistas
const FutbolistaGet = async (req = request, res = response) => {
  try {
    const futbolistas = await Futbolista.find()
      .populate("nacionalidad", "nombre")
      .populate("equipo", "nombre");

    res.json({
      ok: true,
      data: futbolistas,
    });
  } catch (error) {
    console.error("Error al obtener Futbolistas:", error);
    res.status(500).json({ ok: false, error: error.message });
  }
};

// GET - Obtener un futbolista por ID
const FutbolistaIdGet = async (req, res = response) => {
  const { id } = req.params;
  try {
    const futbolistaEncontrado = await Futbolista.findById(id)
      .populate("nacionalidad", "nombre")
      .populate("equipo", "nombre");

    if (!futbolistaEncontrado) {
      return res.status(404).json({
        ok: false,
        msg: "Futbolista no encontrado",
      });
    }

    res.json({
      ok: true,
      futbolista: futbolistaEncontrado,
    });
  } catch (error) {
    console.error("Error al obtener Futbolista:", error);
    res.status(500).json({ ok: false, error: error.message });
  }
};

// PUT - Actualizar un futbolista por ID
const FutbolistaPut = async (req, res = response) => {
  const { id } = req.params;
  const { _id, ...resto } = req.body;

  try {
    const futbolistaActualizado = await Futbolista.findByIdAndUpdate(id, resto, { new: true })
      .populate("nacionalidad", "nombre")
      .populate("equipo", "nombre");

    if (!futbolistaActualizado) {
      return res.status(404).json({
        ok: false,
        msg: "Futbolista no encontrado para actualizar",
      });
    }

    res.json({
      ok: true,
      msg: "Futbolista actualizado correctamente",
      futbolista: futbolistaActualizado,
    });
  } catch (error) {
    console.error("Error al actualizar Futbolista:", error);
    res.status(500).json({ ok: false, error: error.message });
  }
};

// DELETE - Eliminar un futbolista por ID
const FutbolistaDelete = async (req, res = response) => {
  const { id } = req.params;

  try {
    const futbolistaEliminado = await Futbolista.findByIdAndDelete(id);

    if (!futbolistaEliminado) {
      return res.status(404).json({
        ok: false,
        msg: "Futbolista no encontrado para eliminar",
      });
    }

    res.json({
      ok: true,
      msg: "Futbolista eliminado correctamente",
      futbolista: futbolistaEliminado,
    });
  } catch (error) {
    console.error("Error al eliminar Futbolista:", error);
    res.status(500).json({ ok: false, error: error.message });
  }
};

module.exports = {
  FutbolistaPost,
  FutbolistaGet,
  FutbolistaIdGet,
  FutbolistaPut,
  FutbolistaDelete,
};
