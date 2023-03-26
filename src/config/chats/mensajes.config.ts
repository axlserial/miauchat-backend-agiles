import crypto from 'crypto';
import { join } from 'path';
import { writeFile } from 'fs';
import { Socket } from 'socket.io';
import { DataSend, archivo_adjunto } from '../../types';
import mensajes_service from '../../api/services/mensajes.service';

// Clousure que regresa una función que maneja el envío de mensajes
export const messageClousure = (socket: Socket) => {
	const messageSend = async (data: DataSend) => {
		const { archivoData, mensajeData } = data;

		// Guardamos el mensaje en la base de datos
		const [id] = (await mensajes_service.registrarMensaje(mensajeData)) as number[];

		mensajeData.id = id;

		// Si no hay un archivo
		if (!mensajeData.es_adjunto) {
			socket.to(data.mensajeData.sala_id).emit('message-receive', mensajeData);
			return;
		}

		// Guardamos el archivo en la base de datos
		const nombre_server = crypto.randomUUID();
		const archivo: archivo_adjunto = {
			mensaje_id: id,
			nombre_archivo: archivoData!.nombre,
			nombre_server,
			extension: archivoData!.extension
		};

		await mensajes_service.registrarArchivo(archivo);

		// Guardamos el archivo en el servidor
		const path = join(
			__dirname,
			'../../../uploads',
			`${nombre_server}.${archivo.extension}`
		);

		writeFile(path, archivoData!.archivo, err => {
			if (err) {
				console.log(err);
				return;
			}
		});

		// Enviamos el mensaje a la sala
		socket
			.to(data.mensajeData.sala_id)
			.emit('message-receive', { mensajeData, archivo });
	};

	return messageSend;
};

export default {
	messageClousure
};
