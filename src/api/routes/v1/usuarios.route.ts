import express from 'express';
import usuariosController from '../../controllers/usuarios.controller';

// Enrutador del endpoint /api/v1/usuarios
const usuariosRouter = express.Router();

// Obtiene todos los usuarios
usuariosRouter.get('/', usuariosController.getUsuarios);

// Registra un usuario
usuariosRouter.post('/registro', usuariosController.registrarUsuario);

// Iniciar sesión
usuariosRouter.post('/sesion', usuariosController.iniciarSesion);

// Cerrar sesión
usuariosRouter.get('/sesion/cerrar', usuariosController.cerrarSesion);

// Ruta para saber quién soy
usuariosRouter.get('/whoami', usuariosController.whoami);

export default usuariosRouter;
