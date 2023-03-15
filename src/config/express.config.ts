import express from 'express';
import corsConfig from './cors.config';
import morgan from 'morgan';
import constants from '../constants';
import sessions from 'express-session';
import sessionConfig from './session.config';
import socketIOConfig from './socketIO.config';

// id para identificar la sesión
declare module 'express-session' {
	interface SessionData {
		idUsuario: number;
	}
}

// import routes
import v1Router from '../api/routes/v1';

// App initialization
const app = express();

// Middlewares

// -- CORS
app.use(corsConfig());

// -- Logs
app.use(morgan(constants.logs));

// -- Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// -- Session
app.use(sessions(sessionConfig));

// -- Routes

// -- / -- Home route
app.get('/', (req, res) => {
	res.send({ message: 'API de la aplicación MiauChat' });
});

// -- /api/v1 -- API route
app.use('/api/v1', v1Router);

// -- / -- Not found route
app.all('*', (req, res) => {
	res.status(404).json({
		message: 'Ruta no encontrada'
	});
});

// -- SocketIO
const server = socketIOConfig(app);

// export
export default server;
