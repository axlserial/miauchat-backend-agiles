import { Request, Response } from 'express';
import mensajesService from '../services/mensajes.service';

const getMensajes = async (req: Request, res: Response) => {
	const data = await mensajesService.getMensajes();
	res.json(data);
};

export default {
	getMensajes
};
