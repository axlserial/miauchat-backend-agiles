import { Socket } from 'socket.io';
import salas_service from '../../api/services/salas.service';

class SalasDB {
	// Arreglos con ID's de las salas
	private salas: string[] = [];
	private salas_joined: string[] = [];

	// ID del usuario
	private id: number;

	// Socket de la conexión de SocketIO
	private socket: Socket;

	constructor(id: number, socket_con: Socket) {
		this.id = id;
		this.socket = socket_con;
	}

	/**
	 * Actualiza el arreglo de salas del usuario
	 */
	private async updateSalas() {
		const data = await salas_service.getSalasByUsuario(this.id);
		this.salas = data.map(value => value.id as string);
	}

	/**
	 * Deja las salas a las que ya no está conectado
	 */
	async leaveSalas() {
		await this.updateSalas();

		// Obtenemos las salas a las que ya no está conectado
		const salas_leaved = this.salas_joined.filter(
			value => !this.salas.includes(value)
		);

		// si no hay salas para salir
		if (salas_leaved.length == 0) return;

		// Sale de las salas
		salas_leaved.forEach(sala => this.socket.leave(sala));

		// Elimina las salas del array de salas
		this.salas_joined = this.salas_joined.filter(
			value => !salas_leaved.includes(value)
		);
	}

	/**
	 * Se une a las salas a las que no está conectado
	 */
	async joinSalas() {
		await this.updateSalas();
		
		// Si no hay salas para entrar
		if (this.salas.length == 0) return;


		// Obtenemos las salas a las que no está conectado
		const salas_to_join = this.salas.filter(
			value => !this.salas_joined.includes(value)
		);

		// Si no hay salas para entrar
		if (salas_to_join.length == 0) return;

		// Se une a las salas
		salas_to_join.forEach(sala => this.socket.join(sala));

		// Agrega las salas al array de salas
		this.salas_joined = this.salas_joined.concat(salas_to_join);
	}
}

/**
 * Función que crea una instancia de SalasDB
 * @param id ID del usuario
 * @param socket_con Socket de la conexión de SocketIO
 * @returns Instancia de SalasDB
 */
const salas_db = (id: number, socket_con: Socket) => {
	return new SalasDB(id, socket_con);
};

export default salas_db;
