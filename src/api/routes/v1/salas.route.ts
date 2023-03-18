import express from 'express';
import salasController from '../../controllers/salas.controller';

// Enrutador del endpoint /api/v1/salas
const salasRouter = express.Router();

// Obtiene todos los mensajes
salasRouter.get('/', salasController.getSalas);

export default salasRouter;
