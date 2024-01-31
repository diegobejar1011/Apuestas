const Notificacion = require('../models/notificacion.model');

module.exports = async (io,socket) => {
    const getAll = async () => {
        try {
            const notificaciones = await Notificacion.getAll();
            socket.to(socket.hanshake.auth.idUsuario).emit('notificacion:get_success', notificaciones);
        } catch (error) {
            socket.to(socket.hanshake.auth.idUsuario).emit('notificaciones:get_failed', error.message);
        }
    }

    const create = async (payload) => {
        try {
            const notificacionNueva = new Notificacion(payload);
            await notificacionNueva.save();
            socket.emit('notificacion:created_success', notificacionNueva);
        } catch (error) {
            socket.emit('notificacion:created_failed', error.message);
        }
    }

    socket.on('notificacion:get', getAll);
    socket.on('notificacion:create', create);
}