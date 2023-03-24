import { Express } from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

import { options } from './cors.config';
import salas_db from './chats/salas.config';
import message_config from './chats/mensajes.config';

const socketIOConfig = (app: Express) => {
	const server = createServer(app);
	const io = new Server(server, {
		cors: options,
		maxHttpBufferSize: 1e8 // 100 MB
	});

	// Eventos de socket.io
	io.on('connection', async socket => {
		// Obtener id del usuario
		const id = Number(socket.handshake.query.id);
		console.log(`El usuario con el ID: ${id} se ha \x1b[34mconectado \x1b[0m`);

		// Obtener salas
		const salas_usuario = salas_db(id, socket);

		// Se une a las salas
		salas_usuario.joinSalas();

		/**
		 * Eventos para manejo del chat y salas
		 */

		// Evento de envío de mensaje
		socket.on('message-send', message_config.messageClousure(socket));

		// Evento de actualización de salas cuando se unen
		socket.on('join-salas', async () => await salas_usuario.joinSalas());

		// Evento de actualización de salas cuando se salen
		socket.on('leave-salas', async () => await salas_usuario.leaveSalas());

		// Evento de desconexión
		socket.on('disconnect', () => {
			console.log(`El usuario con el ID: ${id} se ha \x1b[31mdesconectado \x1b[0m`);
		});
	});

	return server;
};

export default socketIOConfig;
