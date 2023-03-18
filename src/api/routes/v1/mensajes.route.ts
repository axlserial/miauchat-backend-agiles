import express from 'express';
import mensajesController from '../../controllers/mensajes.controller';

// Enrutador del endpoint /api/v1/mensajes
const mensajesRouter = express.Router();

// Obtiene todos los mensajes
mensajesRouter.get('/', mensajesController.getMensajes);

export default mensajesRouter;
