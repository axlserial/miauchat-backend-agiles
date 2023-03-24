import db from '../../config/knex.config';
import { archivo_adjunto, mensaje } from '../../types';

/**
 * Servicio que regresa todos los mensajes
 */
const getMensajes = async () => {
	return db.select('*').from('mensajes');
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
	registrarMensaje,
	registrarArchivo
};
