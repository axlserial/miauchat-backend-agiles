import db from '../../config/knex.config';
import nanoid from '../../config/nanoid.config';

/**
 * Servicio que regresa todas las salas
 */
const getSalas = async () => {
	return db.select('*').from('salas');
};

export default {
	getSalas
};
