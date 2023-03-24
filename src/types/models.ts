export type sala = {
	id?: string;
	creador_id: number;
	nombre_sala: string;
	ultimo_mensaje: Date;
}

export type mensaje = {
	id?: number;
	contenido: string;
	emisor_id: number;
	fecha_enviado: Date;
	sala_id: string;
	es_adjunto: number;
};

export type archivo_adjunto = {
	mensaje_id?: number;
	nombre_archivo: string;
	nombre_server?: string;
	extension: string;
};
