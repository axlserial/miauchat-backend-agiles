import express from 'express';
import usersController from '../../controllers/users.controller';

// Enrutador del endpoint /api/v1/users
const usersRouter = express.Router();

// Obtiene todos los usuarios
usersRouter.get('/', usersController.getUsers);

export default usersRouter;
