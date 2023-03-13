import { Express } from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { options } from './cors.config';

const socketIOConfig = (app: Express) => {
	const server = createServer(app);
	const io = new Server(server, {
		cors: options
	});

	// Eventos de socket.io
	io.on('connection', socket => {
		// Conexión de un usuario
		console.log(`Usuario ${socket.id} conectado`);

		/**
		 * Eventos de socket.io para el chat
		 */

		// Evento de desconexión
		socket.on('disconnect', () => {
			console.log('Un usuario se ha desconectado');
		});
	});

	return server;
};

export default socketIOConfig;
