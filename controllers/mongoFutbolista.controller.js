const { response, request } = require("express");
const Futbolista = require("../models/mongoFutbolista.model");

const FutbolistaPost = async (req, res = response) => {
  const { nombre, edad, pais, equipo } = req.body;

  try {
    const Futbolista = new Futbolista({ nombre, edad, pais, equipo });
    await Futbolista.save();

    res.status(201).json({
      ok: true,
      msg: "Futbolista creado exitosamente",
      Futbolista,
    });
  } catch (error) {
    console.error("Error al guardar Futbolista:", error);
    res.status(500).json({ ok: false, error: error.message });
  }
};

const FutbolistaGet = async (req = request, res = response) => {
  try {
    const Futbolistaes = await Futbolista.find()
      .populate("pais", "nombre")
      .populate("equipo", "nombre");

    res.json({
      ok: true,
      data: Futbolistaes,
    });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
};

const FutbolistaIdGet = async (req, res = response) => {
  const { id } = req.params;
  try {
    const Futbolista = await Futbolista.findById(id)
      .populate("pais", "nombre")
      .populate("equipo", "nombre");

    if (!Futbolista) {
      return res.status(404).json({
        ok: false,
        msg: "Futbolista no encontrado",
      });
    }

    res.json({
      ok: true,
      Futbolista,
    });
  } catch (error) {
    console.error("Error al obtener Futbolista:", error);
    res.status(500).json({ ok: false, error: error.message });
  }
};

const FutbolistaPut = async (req, res = response) => {
  const { id } = req.params;
  const { _id, ...resto } = req.body;

  try {
    const Futbolista = await Futbolista.findByIdAndUpdate(id, resto, { new: true });
    res.json({
      ok: true,
      msg: "Futbolista actualizado correctamente",
      Futbolista,
    });
  } catch (error) {
    console.error("Error al actualizar Futbolista:", error);
    res.status(500).json({ ok: false, error: error.message });
  }
};

const FutbolistaDelete = async (req, res = response) => {
  const { id } = req.params;

  try {
    const Futbolista = await Futbolista.findByIdAndDelete(id);
    res.json({
      ok: true,
      msg: "Futbolista eliminado correctamente",
      Futbolista,
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
