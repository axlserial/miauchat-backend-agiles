import crypto from 'crypto';
import { join } from 'path';
import { writeFile } from 'fs';
import { Socket } from 'socket.io';
import { DataSend, archivo_adjunto, mensaje_sala } from '../../types';
import mensajes_service from '../../api/services/mensajes.service';

// Clousure que regresa una función que maneja el envío de mensajes
export const messageClousure = (socket: Socket) => {
	const messageSend = async (
		data: DataSend,
		callback: (newMsj: mensaje_sala) => void
	) => {
		const { archivoData, mensajeData } = data;

		// Guardamos el mensaje en la base de datos
		const [id] = (await mensajes_service.registrarMensaje({
			contenido: mensajeData.contenido,
			emisor_id: mensajeData.emisor_id,
			fecha_enviado: mensajeData.fecha_enviado,
			sala_id: mensajeData.sala_id,
			es_adjunto: mensajeData.es_adjunto
		})) as number[];

		mensajeData.id = id;

		// Objeto que se envía a la sala
		const respuesta: mensaje_sala = { mensaje: mensajeData };

		// Si no hay un archivo
		if (!mensajeData.es_adjunto) {
			socket.to(data.mensajeData.sala_id).emit('message-receive', respuesta);
			callback(respuesta);
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
		respuesta.archivo = archivo;
		socket.to(data.mensajeData.sala_id).emit('message-receive', respuesta);

		// Llamamos al callback para que el cliente sepa que el mensaje se envió correctamente
		callback(respuesta);
	};

	return messageSend;
};

export default {
	messageClousure
};
