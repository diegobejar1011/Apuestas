const Partido = require('../models/partido.model');

module.exports = (io, socket) => {
    const create = async (payload) => {
        try {
            const nuevoPartido = new Partido(payload);
            await nuevoPartido.save()
            socket.emit('partido:created_success', nuevoPartido);
        } catch (error) {
            socket.emit('partido:created_failed', error.message);
        }
    }

    const getAll = async () => {
        try {
            const partidos= await Partido.getAll();
            socket.emit('partido:get_success', partidos);
        } catch (error) {
            socket.emit('partido:get_failed', error.message);
        }
    }

    socket.on('partido:get', getAll);
    socket.on('partido:create', create);
}