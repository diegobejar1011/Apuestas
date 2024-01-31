const Opcion = require('../models/opcion.model');

module.exports = (io,socket) => {

    const getAll = async () => {
        try {
            const opciones = await Opcion.getAll();

            io.emit("opcion:get_success", opciones);

        } catch (error) {
            io.emit("opcion:get_failed", error.message);
        }
    }

    const create = async (payload) => {
        try {
            const opcionNueva = new Opcion(payload);

            await opcionNueva.save();

            socket.emit('opcion:created_success', opcionNueva);

            io.emit('opcion', opcionNueva);

        } catch (error) {
            socket.emit('opcion:created_failed', error.message);
        }
    }

    const updatePoints = async (payload) => {
        console.log(payload);
        try {
            const opcion = await Opcion.updatedPoints(payload);
            io.emit("opcion:updated_success", opcion);
            console.log(opcion);
        } catch (error) {
            socket.emit("opcion:updated_failed", error.message);
        }
    }

    socket.on('opcion:get', getAll);
    socket.on('opcion:create', create);
    socket.on('opcion:update', updatePoints);

}