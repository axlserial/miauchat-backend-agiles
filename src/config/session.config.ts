import sessions from 'express-session';
import db from './knex.config';
import constants from '../constants';
import initFunction from 'connect-session-knex';

// Para guardar las sesiones en la base de datos
const KnexSessionStore = initFunction(sessions);

// Configuración de guardado de sesiones en la base de datos
const store = new KnexSessionStore({
	knex: db,
	createtable: true
});

// Duración de la sesión
const oneWeek = 1000 * 60 * 60 * 24 * 7;

// Configuración de la sesión
const sessionConfig = {
	secret: constants.session_secret,
	cookie: { maxAge: oneWeek },
	saveUninitialized: false,
	resave: false,
	store
};

export default sessionConfig;
