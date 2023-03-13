import express from 'express';
import usersRouter from './user.route';

// Enrutador del endpoint /api/v1
const v1Router = express.Router();

// Enrutador del endpoint /api/v1/users
v1Router.use('/users', usersRouter);

export default v1Router;
