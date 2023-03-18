import express from 'express';
import usuariosRouter from './usuarios.route';
import mensajesRouter from './mensajes.route';
import salasRouter from './salas.route';

// Enrutador del endpoint /api/v1
const v1Router = express.Router();

// Enrutador del endpoint /api/v1/usuarios
v1Router.use('/usuarios', usuariosRouter);

// Enrutador del endpoint /api/v1/salas
v1Router.use('/salas', salasRouter);

// Enrutador del endpoint /api/v1/mensajes
v1Router.use('/mensajes', mensajesRouter);

export default v1Router;
