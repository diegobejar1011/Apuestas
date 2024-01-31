const Notificacion = require("../models/notificacion.model");

const getAll = async (req, res) => {
  try {
    const notificaciones = await Notificacion.getAll();
    return res.status(200).json(notificaciones);
  } catch (error) {
    return res.status(500).json({
      message: "Ocurrió un error al conseguir las notificaciones",
      error: error.message,
    });
  }
};

const create = async (req, res) => {
  try {
    const { apuesta, tipo } = req.body;
    const nuevaNotificacion = new Notificacion(apuesta, tipo);
    await nuevaNotificacion.save();
    responderClientes(nuevaNotificacion);
    return res.status(200).json({
      message: "Se crearon todas las notificaciones correctamente",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Ocurrio un error al crear las notificaciones",
      error: error.message,
    });
  }
};

let resClientes = [];

const getUpdated = async (req, res) => {
    resClientes.push(res);
    req.on("close", () => {
      const index = resClientes.length - 1;
      resClientes = resClientes.slice(index, 1);
    });
};

function responderClientes(notificacion) {
  for (res of resClientes) {
      res.status(200).json(notificacion);
  }
  resClientes = [];
}


module.exports = {
    getAll,
    getUpdated,
    create
}