import db from '../../config/knex.config';
import nanoid from '../../config/nanoid.config';

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
    nombre_sala: string,
	ultimo_mensaje:String
): Promise<JSON[]> => {
	return db('salas').insert([{ id, creador_id, nombre_sala,ultimo_mensaje }],['id','creador_id','nombre_sala','ultimo_mensaje']);
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
export default {
	getSalas,
	crearSala,
    getSalasById
};
