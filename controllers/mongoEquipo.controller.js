const { response, request } = require("express");
const Equipo = require("../models/mongoEquipo.model");

const EquipoPost = async (req, res = response) => {
  const { nombre, pais } = req.body;

  try {
    const existeEquipo = await Equipo.findOne({ nombre });
    if (existeEquipo) {
      return res.status(400).json({
        msg: "Ya existe un equipo con ese nombre.",
      });
    }

    const equipo = new Equipo({ nombre, pais });
    await equipo.save();

    res.status(201).json({
      ok: true,
      msg: "Equipo creado exitosamente",
      equipo,
    });
  } catch (error) {
    console.error("Error al guardar equipo:", error);
    res.status(500).json({ ok: false, error: error.message });
  }
};

const EquipoGet = async (req = request, res = response) => {
  try {
    const equipos = await Equipo.find().populate("pais", "nombre");

    res.json({
      ok: true,
      data: equipos,
    });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
};

const EquipoIdGet = async (req, res = response) => {
  const { id } = req.params;
  try {
    const equipo = await Equipo.findById(id).populate("pais", "nombre");

    if (!equipo) {
      return res.status(404).json({
        ok: false,
        msg: "Equipo no encontrado",
      });
    }

    res.json({
      ok: true,
      equipo,
    });
  } catch (error) {
    console.error("Error al obtener equipo:", error);
    res.status(500).json({ ok: false, error: error.message });
  }
};

const EquipoPut = async (req, res = response) => {
  const { id } = req.params;
  const { _id, ...resto } = req.body;

  try {
    const equipo = await Equipo.findByIdAndUpdate(id, resto, { new: true });
    res.json({
      ok: true,
      msg: "Equipo actualizado correctamente",
      equipo,
    });
  } catch (error) {
    console.error("Error al actualizar equipo:", error);
    res.status(500).json({ ok: false, error: error.message });
  }
};

const EquipoDelete = async (req, res = response) => {
  const { id } = req.params;

  try {
    const equipo = await Equipo.findByIdAndDelete(id);
    res.json({
      ok: true,
      msg: "Equipo eliminado correctamente",
      equipo,
    });
  } catch (error) {
    console.error("Error al eliminar equipo:", error);
    res.status(500).json({ ok: false, error: error.message });
  }
};

module.exports = {
  EquipoPost,
  EquipoGet,
  EquipoIdGet,
  EquipoPut,
  EquipoDelete,
};
