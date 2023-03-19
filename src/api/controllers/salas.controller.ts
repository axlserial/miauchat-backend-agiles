import { Request, Response } from 'express';
import nanoid from '../../config/nanoid.config';
import salasService from '../services/salas.service';

const getSalas = async (req: Request, res: Response) => {
	const data = await salasService.getSalas();
	res.json(data);
};
const crearSala = async (req: Request, res: Response) => {
	const id= await nanoid()
	//campos no vacios
	const { creador_id,nombre_sala} = req.body;
	if (!creador_id || !nombre_sala) {
		res.status(400).json({ message: 'Faltan datos' });
		return;
	}
	// Registrar la sala
	const ingresoSala = await salasService.crearSala(
		id,
		creador_id,
		nombre_sala
	);
	// Validar que la sala se haya registrado correctamente
	if (ingresoSala.length > 0 ) {
		res.status(201).json({
			id:id,
			creador_id,
			nombre_sala
		});
		return;
	}
	// En caso de que no se haya registrado correctamente
	res.status(500).json({ message: 'Error al ingresar la sala' });
}   
const getSalasById = async (req: Request, res: Response) => {
	const {creador_id} = req.body
	res.json({ message: await salasService.getSalasById(creador_id) });
}; 

export default {
	getSalas,
	crearSala,
    getSalasById
};
