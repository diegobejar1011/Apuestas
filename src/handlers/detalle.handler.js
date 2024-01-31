const { off } = require('../config/db.config');
const Detalle = require('../models/detalle.model');

module.exports = (io, socket) => {
    const create = async (payload) => {
        try {
            const nuevoDetalle = new Detalle(payload);
             const idNuevoDetalle = await nuevoDetalle.save();

             let objetoDetalle = {
                id_detalle: idNuevoDetalle,
                ...nuevoDetalle
             }
             
            socket.emit('detalle:created_success', objetoDetalle);
        } catch (error) {
            socket.emit('detalle:created_failed', error.message);
        }
    };

    const getAll = async (payload) => {
        try {
            const { id_apuesta } = payload;
            const detalles = await Detalle.getAll(payload);
            io.to(id_apuesta).emit('detalle:get_success', detalles);
        } catch (error) {
            io.to(id_apuesta).emit('detalle:get_failed', error);
        }
    };

    const saveTypes = async (payload) => {
        try {
            const result = await Detalle.saveType(payload);
            socket.emit('detalle:saveTypes_success', result.insertId);
        } catch (error) {
            socket.emit('detalle:saveTypes_failed', error);
        }
    };

    const getTypes = async () => {
        try {
            const tipos = await Detalle.getTypes();
            socket.emit('detalle:getTypes_success', tipos);
        } catch (error) {
            socket.emit('detalle:getTypes_failed', error.message);
        }
    };

    const getThanId = async () => {
        try {
            const { offset, idUsuario } = socket.handshake.auth;
            const nuevosDetalles = await Detalle.getThanId(offset, idUsuario);
            socket.to(idUsuario).emit('delivery_success', nuevosDetalles);
        } catch (error) {
            socket.to().emit('delivery_failed', error.message );
        }
    }


   

    socket.on('detalle:create', create);
    socket.on('detalle:get', getAll);
    socket.on('detalle:saveTypes', saveTypes);
    socket.on('detalle:getTypes', getTypes);
    socket.on('reconnection', getThanId);
}