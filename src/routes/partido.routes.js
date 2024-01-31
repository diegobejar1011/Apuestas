const { Router } = require('express');
const partidoControllers = require('../controllers/partido.controller');
const authMiddleware = require('../middlewares/http/auth.middleware');

const partidoRouter = Router();

partidoRouter.get('/', partidoControllers.getAll);
partidoRouter.get('/updated/:id', partidoControllers.getUpdated);

module.exports = partidoRouter;