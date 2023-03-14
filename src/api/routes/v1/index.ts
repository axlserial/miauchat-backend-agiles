import express from 'express';
import usuariosRouter from './usuarios.route';

// Enrutador del endpoint /api/v1
const v1Router = express.Router();

// Enrutador del endpoint /api/v1/users
v1Router.use('/usuarios', usuariosRouter);

export default v1Router;
