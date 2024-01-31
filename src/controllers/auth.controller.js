const bcrypt = require('bcrypt');
const jwt  = require('jsonwebtoken');
const secretJWT = process.env.SECRET_JWT;
const Usuario = require('../models/usuario.model');
 
const login = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    const usuarioEncontrado = await Usuario.getByEmail(email);

    if(!usuarioEncontrado){
        return res.status(401).json({
            message: 'Email incorrecto'
        });
    }
    
    const isCorrectPass = bcrypt.compareSync(password, usuarioEncontrado.password);

    if(!isCorrectPass) {
        return res.status(401).json({
            message: 'contraseña incorrecta'
        })
    }

    const payload = {
        user: {
            _id: usuarioEncontrado.id
        }
    }
    const token = jwt.sign(payload, secretJWT, {expiresIn: '1h'});

    return res.status(200).json({
        message: 'Acceso concedido',
        token, 
        idUsuario: usuarioEncontrado.id
    });
}

module.exports = {
    login
}