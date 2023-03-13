import { Request, Response } from 'express';
import usersService from '../services/users.service';

const getUsers = async (req: Request, res: Response) => {
	res.json({ message: usersService.getUsers() });
};

export default {
	getUsers
};
