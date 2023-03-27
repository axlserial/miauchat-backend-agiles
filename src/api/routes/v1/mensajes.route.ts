import express from 'express';
import mensajesController from '../../controllers/mensajes.controller';

// Enrutador del endpoint /api/v1/mensajes
const mensajesRouter = express.Router();

// Obtiene todos los mensajes
mensajesRouter.get('/', mensajesController.getMensajes);

// Obtiene todos los mensajes de una sala
mensajesRouter.get('/mensajes-sala/:sala_id', mensajesController.getMensajesBySala);

// Descarga un archivo adjunto
mensajesRouter.get('/adjunto/:nombre_server', mensajesController.sendAdjunto);

export default mensajesRouter;
