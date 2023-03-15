import { Request, Response } from 'express';
import usuariosService from '../services/usuarios.service';

const getUsuarios = async (req: Request, res: Response) => {
	res.json({ message: await usuariosService.getUsuarios() });
};

const registrarUsuario = async (req: Request, res: Response) => {
	const { usuario, password, foto_perfil } = req.body;

	// Validar que los datos no estén vacíos
	if (!usuario || !password || !foto_perfil) {
		res.status(400).json({ message: 'Faltan datos' });
		return;
	}

	// Validar que el usuario no exista
	const usuarioExiste = await usuariosService.getUsuarioByNombre(usuario);

	if (usuarioExiste) {
		res.status(400).json({ message: 'El usuario ya existe' });
		return;
	}

	// Registrar el usuario
	const usuarioRegistrado = await usuariosService.registrarUsuario(
		usuario,
		password,
		foto_perfil
	);

	// Validar que el usuario se haya registrado correctamente
	if (usuarioRegistrado.length > 0 && usuarioRegistrado[0]) {
		req.session.idUsuario = usuarioRegistrado[0];
		res.status(201).json({
			message: 'Usuario registrado',
			data: {
				id: usuarioRegistrado[0],
				usuario,
				foto_perfil
			}
		});
		return;
	}

	// En caso de que no se haya registrado correctamente
	res.status(500).json({ message: 'Error al registrar el usuario' });
};

export default {
	getUsuarios,
	registrarUsuario
};
