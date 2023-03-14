import db from '../../config/knex.config';

/**
 * Servicio que regresa todos los usuarios
 */
const getUsuarios = async () => {
	return db.select('id', 'usuario').from('usuarios');
};

export default {
	getUsuarios
};
