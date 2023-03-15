import db from '../../config/knex.config';

/**
 * Servicio que regresa todos los usuarios
 */
const getUsuarios = async () => {
	return db.select('id', 'usuario').from('usuarios');
};

/**
 * Servicio que regresa un usuario
 * @param id ID del usuario
 * @returns Usuario
 */
const getUsuario = async (id: number) => {
	return db.select('*').from('usuarios').where({ id }).first();
};

/**
 * Servicio que regresa un usuario
 * @param usuario Nombre de usuario
 * @returns Usuario
 */
const getUsuarioByNombre = async (usuario: string) => {
	return db.select('*').from('usuarios').where({ usuario }).first();
};

/**
 * Servicio que registra un usuario
 * @param usuario Nombre de usuario
 * @param password Contraseña
 * @param foto_perfil Foto de perfil
 * @returns Usuario
 */
const registrarUsuario = async (
	usuario: string,
	password: string,
	foto_perfil: number
): Promise<number[]> => {
	return db('usuarios').insert([{ usuario, password, foto_perfil }], ['id']);
};

export default {
	getUsuarios,
	getUsuario,
	registrarUsuario,
	getUsuarioByNombre
};
