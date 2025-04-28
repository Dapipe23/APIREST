const { response, request } = require("express");
const Contratacion = require("../models/mongoContratacion.model");

const ContratacionPost = async (req, res = response) => {
  const { idjugador, idequipo, desde, hasta } = req.body;

  try {
    const existeContratacion = await Contratacion.findOne({ idjugador, idequipo, desde, hasta });
    if (existeContratacion) {
      return res.status(400).json({
        ok: false,
        msg: "Ya existe una Contratación similar registrada.",
      });
    }

    const contratacion = new Contratacion({ idjugador, idequipo, desde, hasta });

    await contratacion.save();

    res.status(201).json({
      ok: true,
      msg: "Contratación creada exitosamente",
      contratacion,
    });
  } catch (error) {
    console.error("Error al guardar Contratacion:", error);
    res.status(500).json({ ok: false, error: error.message });
  }
};

const ContratacionGet = async (req = request, res = response) => {
  try {
    const contrataciones = await Contratacion.find({})
      .populate("idjugador", "nombre posicion nacionalidad")
      .populate("idequipo", "nombre pais");

    res.json({
      ok: true,
      data: contrataciones,
    });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
};

const ContratacionIdGet = async (req, res = response) => {
  const { id } = req.params;

  try {
    const contratacion = await Contratacion.findById(id)
      .populate("idjugador", "nombre posicion nacionalidad")
      .populate("idequipo", "nombre pais");

    if (!contratacion) {
      return res.status(404).json({
        ok: false,
        msg: "Contratación no encontrada",
      });
    }

    res.json({
      ok: true,
      contratacion,
    });
  } catch (error) {
    console.error("Error al obtener Contratacion:", error);
    res.status(500).json({ ok: false, error: error.message });
  }
};

const ContratacionPut = async (req, res = response) => {
  const { id } = req.params;
  const { _id, ...resto } = req.body;

  try {
    const contratacion = await Contratacion.findByIdAndUpdate(id, resto, { new: true })
      .populate("idjugador", "nombre posicion nacionalidad")
      .populate("idequipo", "nombre pais");

    res.json({
      ok: true,
      msg: "Contratación actualizada correctamente",
      contratacion,
    });
  } catch (error) {
    console.error("Error al actualizar Contratacion:", error);
    res.status(500).json({ ok: false, error: error.message });
  }
};

const ContratacionDelete = async (req, res = response) => {
  const { id } = req.params;

  try {
    const contratacion = await Contratacion.findByIdAndDelete(id);

    res.json({
      ok: true,
      msg: "Contratación eliminada correctamente",
      contratacion,
    });
  } catch (error) {
    console.error("Error al eliminar Contratacion:", error);
    res.status(500).json({ ok: false, error: error.message });
  }
};

module.exports = {
  ContratacionGet,
  ContratacionIdGet,
  ContratacionPost,
  ContratacionPut,
  ContratacionDelete,
};
