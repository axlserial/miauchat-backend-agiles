import db from '../../config/knex.config';

/**
 * Servicio que regresa todos los mensajes
 */
const getMensajes = async () => {
	return db.select('*').from('mensajes');
};

export default {
	getMensajes
};
