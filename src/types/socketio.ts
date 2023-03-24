import { mensaje } from './models';

export type DataSend = {
	mensajeData: mensaje;
	archivoData?: {
		archivo: Buffer;
		nombre: string;
		extension: string;
	};
};
