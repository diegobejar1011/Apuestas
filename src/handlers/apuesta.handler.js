const Apuesta = require('../models/apuesta.model');

module.exports = (io, socket) => {

    const create = async (payload) => {

        try {
            const nuevaApuesta = new Apuesta(payload);

            const idNuevaApuesta = await nuevaApuesta.save();

            const data = {
                id: idNuevaApuesta,
                ...nuevaApuesta
            }

            socket.emit('apuesta:created_success', data);

            io.emit('nueva_apuesta', nuevaApuesta);
            
        } catch (error) {

            const data = {
                message: 'Ocurrio un error al crear la apuesta',
                error: error.message
            }

            socket.emit('apuesta:created_failed', data);
        }
    }

    const getAll = async () => {
        try {
            const apuestas = await Apuesta.getAll();
            
            io.emit("apuesta:get_success", apuestas);
        } catch (error) {
            io.emit("apuesta:get_failed", error.message);
        }
    }

    const updateById = async (payload) => {
        try {
            const apuesta = await Apuesta.updateById(payload);

            io.emit("apuesta:updated_success", apuesta);
        } catch (error) {
            const data = {
                message: "Ocurrio un error al actualizar la apuesta",
                error: error.message
            }

            socket.emit("apuesta:updated_failed", data);
        }
    }

    const getWinners = async (payload) => {
        try {
            const ganadores = await Apuesta.getWinners(payload);
            const data = { ganadores, tipo: 'W'}
            io.emit('apuesta:getWinners_success', data);
        } catch (error) {
            const data = {
                message: "Ocurrio un error al actualizar la apuesta",
                error: error.message
            }
            io.emit('apuesta:getWinners_failed', data);
        }
    }

    const getLosers = async (payload) => {
        try {
            const perdedores = await Apuesta.getLosers(payload);
            const data = { perdedores, tipo: 'L'}
            io.emit('apuesta:getLosers_success', data);
        } catch (error) {
            const data = {
                message: "Ocurrio un error al actualizar la apuesta",
                error: error.message
            }
            io.emit('apuesta:getLosers_failed', data);
        }
    }

    socket.on("apuesta:create", create);
    socket.on("apuesta:get", getAll);
    socket.on("apuesta:finish", updateById);
    socket.on("apuesta:getWinners", getWinners);
    socket.on('apuesta:getLosers', getLosers);
}