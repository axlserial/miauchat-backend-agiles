import { mensaje_with_author } from './models';

export type DataSend = {
	mensajeData: mensaje_with_author;
	archivoData?: {
		archivo: Buffer;
		nombre: string;
		extension: string;
	};
};
