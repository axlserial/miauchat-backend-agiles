import db from '../../config/knex.config';
import { archivo_adjunto, mensaje, mensaje_with_author } from '../../types';

/**
 * Servicio que regresa todos los mensajes
 */
const getMensajes = async () => {
	return db.select('*').from('mensajes');
};

const getMensajesBySala = async (sala_id: string) => {
	return db
		.select('mensajes.*', 'usuarios.usuario')
		.from<mensaje_with_author>('mensajes')
		.join('usuarios', 'mensajes.emisor_id', '=', 'usuarios.id')
		.where<mensaje_with_author[]>('sala_id', sala_id)
		.orderBy('mensajes.fecha_enviado', 'asc');
};

const getArchivoByNombreServer = async (nombre_server: string) => {
	return db
		.select('*')
		.from<archivo_adjunto>('archivos_adjuntos')
		.where('nombre_server', nombre_server)
		.first();
};

const getArchivosByMensajes = async (mensaje_id: number[]) => {
	return db
		.select('*')
		.from<archivo_adjunto>('archivos_adjuntos')
		.whereIn('mensaje_id', mensaje_id);
};

/**
 * Servicio que registra un mensaje en la base de datos
 */
const registrarMensaje = async (mensaje: mensaje) => {
	return db('mensajes').insert(mensaje);
};

/**
 * Registrar un archivo adjunto
 */
const registrarArchivo = async (archivo: archivo_adjunto) => {
	return db('archivos_adjuntos').insert(archivo);
};

export default {
	getMensajes,
	getMensajesBySala,
	getArchivoByNombreServer,
	getArchivosByMensajes,
	registrarMensaje,
	registrarArchivo
};
