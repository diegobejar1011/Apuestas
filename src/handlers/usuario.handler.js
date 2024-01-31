const Usuario = require('../models/usuario.model');
const bcrypt = require('bcrypt');
const saltRounds = parseInt(process.env.SALT_ROUNDS_BCRYPT);

module.exports = (io, socket) => {
    const create = async (payload) => {
        try {
            let usuario = {
                nombre: payload.nombre,
                email: payload.email, 
                password: await bcrypt.hash(payload.password, saltRounds)
            }
            const usuarioNuevo = new Usuario(usuario);
            await usuarioNuevo.save();
            socket.emit('usuario:created_success', usuarioNuevo);
        } catch (error) {
            console.log(error);
            socket.emit('usuario:created_failed', error);
        }
    }

    const getAll = async () => {
        try {
            const usuarios = await Usuario.getAll();
            socket.emit('usuario:get_success', usuarios);
        } catch (error) {
            socket.emit('usuario:get_failed', error.message);
        }
    }

    const createBet = async (payload) => {
        try {
            socket.join(payload.id_apuesta); 
            const result = await Usuario.createBet(payload);
            socket.emit('usuario:createBet_success', result.insertId);
        } catch (error) {   
            socket.emit('usuario:createBet_failed', error.message);
        }
    }

    socket.on('usuario:create', create);
    socket.on('usuario:get', getAll);
    socket.on('usuario:createBet', createBet);
}