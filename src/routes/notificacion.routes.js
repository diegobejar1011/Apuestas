const notificacionControllers = require('../controllers/notificacion.controller');
const { Router } = require('express');
const authMiddleware = require('../middlewares/http/auth.middleware');

const notificacionRouter = Router();

notificacionRouter.get('/',  notificacionControllers.getAll);
notificacionRouter.get('/updated', notificacionControllers.getUpdated);
notificacionRouter.post('/',  notificacionControllers.create);

module.exports = notificacionRouter;