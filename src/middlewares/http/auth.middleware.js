const jwt = require('jsonwebtoken');
const secretJWT = process.env.SECRET_JWT;

const verifyJWT = (req, res, next) => {
    try {
        const token = req.get('Authorization');

        jwt.verify(token, secretJWT, (err, decode) => {
            if(err) {
                return res.status(401).json({
                    message: 'Error al validar el token',
                    error: err.message
                });
            }

            req.user = decode.user;
            next();
        })
    } catch (error) {
        return res.status(401).json({
            message: 'Error al validar el token', 
            error: error.message
        })
    }
} 

module.exports = {
    verifyJWT
}