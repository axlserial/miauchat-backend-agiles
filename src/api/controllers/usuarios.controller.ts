import { Request, Response } from 'express';
import usuariosService from '../services/usuarios.service';

const getUsuarios = async (req: Request, res: Response) => {
	res.json({ message: await usuariosService.getUsuarios() });
};

export default {
	getUsuarios
};
