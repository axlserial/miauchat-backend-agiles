import express from 'express';
import compression from 'compression';
import corsConfig from './cors.config';
import morganConfig from './morgan.config';
import constants from '../constants';
import sessions from 'express-session';
import clientConfig from './client.config';
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

// -- Compression
app.use(compression());

// -- CORS
app.use(corsConfig());

// -- Logs
app.use(morganConfig(constants.logs));

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

// -- client -- Static files
if (constants.environment === 'production') {
	clientConfig(app);
}

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
