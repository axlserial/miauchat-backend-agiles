import express from 'express';
import corsConfig from './cors.config';
import morgan from 'morgan';
import constants from '../constants';
import socketIOConfig from './socketIO.config';

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

// -- Routes
app.use('/api/v1', v1Router);

// -- SocketIO
const server = socketIOConfig(app);

// export
export default server;
