import { Request, Response } from 'express';
import salasService from '../services/salas.service';

const getSalas = async (req: Request, res: Response) => {
	const data = await salasService.getSalas();
	res.json(data);
};

export default {
	getSalas
};
