import { Request, Response } from 'express';
import { mensaje, mensaje_sala } from '../../types';
import mensajesService from '../services/mensajes.service';

const getMensajes = async (req: Request, res: Response) => {
	const data = await mensajesService.getMensajes();
	res.json(data);
};

const getMensajesBySala = async (req: Request, res: Response) => {
	const { sala_id } = req.params;

	const data = await mensajesService.getMensajesBySala(sala_id);

	// De los mensajes obtenidos, obtener los archivos adjuntos
	const mesajes_id = data
		.filter((mensaje: mensaje) => mensaje.es_adjunto === 1)
		.map(mensaje => Number(mensaje.id));

	const archivos_adjuntos = await mensajesService.getArchivosByMensajes(mesajes_id);

	// Agregar los archivos adjuntos a los mensajes
	const mensajes: mensaje_sala[] = data.map(mensaje => {
		const archivo = archivos_adjuntos.find(
			archivo_ad => archivo_ad.mensaje_id === mensaje.id
		);

		return {
			mensaje,
			archivo
		};
	});

	res.json(mensajes);
};

export default {
	getMensajes,
	getMensajesBySala
};
