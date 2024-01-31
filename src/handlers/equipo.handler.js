
const Equipo = require('../models/equipo.model');

module.exports = (oi, socket) => {
    const getAll = async () => {
        try {
            const equipos = await Equipo.getAll();
            socket.emit('equipo:get_success', equipos);
        } catch (error) {
            socket.emit('equipo:get_failed', error.message);
        }
    }

    const create = async (payload) => {
        console.log(payload)
        try {
            const nuevoEquipo = new Equipo(payload);
            await nuevoEquipo.save();
            socket.emit('equipo:created_success', nuevoEquipo);
        } catch (error) {
            socket.emit('equipo:created_failed', error.message);
        }
    } 

    socket.on('equipo:get', getAll);
    socket.on('equipo:create', create);
}