import express from 'express';
import salasController from '../../controllers/salas.controller';

// Enrutador del endpoint /api/v1/salas
const salasRouter = express.Router();

// Obtiene todos los mensajes
salasRouter.get('/', salasController.getSalas);

//obtiene todos las salas del usuario
salasRouter.get('/getSalasById', salasController.getSalasById);

// Crear sala
salasRouter.post('/crear', salasController.crearSala);

// Agregar usuario a una sala
salasRouter.post('/participantes', salasController.addParticipante);

// Obtener participantes de una sala
salasRouter.get('/participantes', salasController.getParticipantes);

// Elimina un participante de la sala
salasRouter.post('/eliminar-participante', salasController.eliminarParticipante);

export default salasRouter;
