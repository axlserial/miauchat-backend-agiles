import db from '../../config/knex.config';

/**
 * Servicio que regresa todas las salas
 */
const getSalas = async () => {
	return db.select('*').from('salas');
};
/**
 * Servicio que crea una sala
 * @param id creador_id nombre_sala ultimo_mensaje
 * @returns sala
 */
const crearSala = async (
	id:string,
	creador_id: number,
    nombre_sala: string
): Promise<JSON[]> => {
	return db('salas').insert([{ id, creador_id, nombre_sala}]);
};
/**
 * Servicio que regresa las salas por usuario 
 * @param creador_id
 * @returns salas del usuario
 */
const getSalasById = async (
    creador_id: number
): Promise<JSON[]> => {
    return db.select('*').from('salas').where({ creador_id });
};


/**
 * Servicio que ingresa a un usuario a una sala
 * @param id_usuario ID del usuario
 * @param sala_id	ID de la sala
 * @returns sala 
 */
const addParticipante = async (sala: any): Promise <JSON[]> => {
	const { usuario_id, sala_id } = sala;
	return db('sala_participantes').insert({
		usuario_id,
		sala_id
	});
};
/**
 * Servicio que regresa los participantes de una sala
 * @param sala_id ID de la sala
 * @returns participantes
 */
const getParticipantes = async (sala_id: number): Promise<JSON[]> => {
	return db.select('usuario_id').from('sala_participantes').where({ sala_id });
};


export default {
	getSalas,
	crearSala,
    getSalasById,
	addParticipante,
	getParticipantes
};
