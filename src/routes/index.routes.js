const { Router } = require('express');
const partidoRouter = require('./partido.routes');
const notificacionRouter = require('./notificacion.routes');
const authRouter = require('./auth.routes');

const indexRouter = Router();

indexRouter.use('/partidos', partidoRouter);
indexRouter.use('/notificaciones', notificacionRouter);
indexRouter.use('/auth', authRouter);

module.exports = indexRouter;

