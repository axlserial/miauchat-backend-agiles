import express from 'express';
import usersController from '../../controllers/usuarios.controller';

// Enrutador del endpoint /api/v1/users
const usuariosRouter = express.Router();

// Obtiene todos los usuarios
usuariosRouter.get('/', usersController.getUsuarios);

// Registra un usuario
usuariosRouter.post('/registro', usersController.registrarUsuario);

// Iniciar sesión
usuariosRouter.post('/sesion', usersController.iniciarSesion);

export default usuariosRouter;
