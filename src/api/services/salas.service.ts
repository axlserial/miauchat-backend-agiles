import db from '../../config/knex.config';
import { sala } from '../../types';

/**
 * Servicio que regresa todas las salas
 */
const getSalas = async () => {
	return db.select('*').from<sala>('salas');
};

/**
 * Servicio que regresa los IDs de las salas a las que un usuario
 * está inscrito
 */
const getSalasByUsuario = async (id: number) => {
	return db
		.select('salas.*')
		.from('salas')
		.join('sala_participantes', 'salas.id', '=', 'sala_participantes.sala_id')
		.where<sala[]>('sala_participantes.usuario_id', id)
		.orderBy('salas.ultimo_mensaje', 'desc');
};

/**
 * Servicio que crea una sala
 * @param id creador_id nombre_sala ultimo_mensaje
 * @returns sala
 */
const crearSala = async (
	id: string,
	creador_id: number,
	nombre_sala: string
): Promise<JSON[]> => {
	return db('salas').insert([{ id, creador_id, nombre_sala }]);
};

/**
 * Servicio que regresa las salas por usuario
 * @param creador_id
 * @returns salas del usuario
 */
const getSalasById = async (creador_id: number): Promise<JSON[]> => {
	return db.select('*').from('salas').where({ creador_id });
};

/**
 * Servicio que ingresa a un usuario a una sala
 * @param id_usuario ID del usuario
 * @param sala_id	ID de la sala
 * @returns sala
 */
const addParticipante = async (sala: any): Promise<JSON[]> => {
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

/**
 * Servicio que elimina un participante de una sala
 * @param usuario_id ID del usuario
 * @param sala_id ID de la sala
 * @returns Número de filas afectadas
 */
const deleteParticipante = async (usuario_id: number, sala_id: string) => {
	return db('sala_participantes').where({ usuario_id, sala_id }).del();
};

export default {
	getSalas,
	getSalasByUsuario,
	crearSala,
	getSalasById,
	addParticipante,
	getParticipantes,
	deleteParticipante
};
