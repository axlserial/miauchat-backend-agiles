import { Request, Response } from 'express';
import { nanoid } from 'nanoid';
import salasService from '../services/salas.service';

const getSalas = async (req: Request, res: Response) => {
	const data = await salasService.getSalas();
	res.json(data);
};
const crearSala = async (req: Request, res: Response) => {
	const id= await nanoid()
	//campos no vacios
	const { creador_id,nombre_sala,ultimo_mensaje} = req.body;
	if (!creador_id || !nombre_sala || !ultimo_mensaje) {
		res.status(400).json({ message: 'Faltan datos' });
		return;
	}
	// Registrar la sala
	const ingresoSala = await salasService.crearSala(
		id,
		creador_id,
		nombre_sala,
		ultimo_mensaje
	);
	// Validar que la sala se haya registrado correctamente
	if (ingresoSala.length > 0 ) {
		res.status(201).json({
			id:id,
			creador_id,
			nombre_sala,
			ultimo_mensaje
		});
		return;
	}
}   
const getSalasById = async (req: Request, res: Response) => {
	const {creador_id} = req.body
	res.json({ message: await salasService.getSalasById(creador_id) });
};

const getAdministrador = async (req: Request, res: Response) => {
	const { sala_id } = req.body;
	const data = await salasService.getAdministrador(sala_id);

	// Validar que el administrador se haya encontrado
	if (data.length > 0) {
		res.json({message: data});
		return;
	}
	res.status(404).json({ message: 'No se encontró el administrador' });
};

const addParticipante = async (req: Request, res: Response) => {
	const { usuario_id, sala_id } = req.body;

	// Validar que los datos no estén vacíos
	if (!usuario_id || !sala_id) {
		res.status(400).json({ message: 'Faltan datos' });
		return;
	}

	// Validar que el usuario no esté dentro de la sala
	const existe = await salasService.getParticipantes(sala_id);
	if (existe.find((element: any) => element.usuario_id === usuario_id)) {
		res.status(400).json({ message: 'El usuario ya se encuentra dentro de la sala' });
		return;
	}

	// Validar que el usuario no sea el administrador
	const administrador = await salasService.getAdministrador(sala_id);
	if (administrador[0].creador_id === usuario_id) {
		res.status(400).json({ message: 'El usuario es el administrador de la sala' });
		return;
	}

	// Agregar usuario a la sala
	const ingresoUsuario = await salasService.addParticipante({
		usuario_id,
		sala_id
	});

	// Validar que el usuario se haya agregado correctamente
	if (ingresoUsuario.length > 0) {
		res.status(201).json({ message: 'Usuario agregado a la sala' });
		return;
	}

	res.status(400).json({ message: 'No se pudo agregar el usuario a la sala' });
};

const getParticipantes = async (req: Request, res: Response) => {
	const { sala_id } = req.body;

	// Validar que los datos no estén vacíos
	if (!sala_id) {
		res.status(400).json({ message: 'Faltan datos' });
		return;
	}

	// Obtener participantes
	const participantes = await salasService.getParticipantes(sala_id);
	if (participantes.length > 0) {
		res.status(201).json({ message: participantes });
		return;
	}
	res.status(400).json({ message: 'No se pudo obtener los participantes' });
};

export default {
	getSalas,
	crearSala,
    getSalasById,
	getAdministrador,
	addParticipante,
	getParticipantes
};
