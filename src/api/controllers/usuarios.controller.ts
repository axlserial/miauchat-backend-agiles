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
		// Guardar el ID del usuario en la sesión
		req.session.idUsuario = usuarioRegistrado[0];

		// Enviar la respuesta, con los datos del usuario
		res.status(201).json({
			id: usuarioRegistrado[0],
			usuario,
			foto_perfil
		});
		return;
	}

	// En caso de que no se haya registrado correctamente
	res.status(500).json({ message: 'Error al registrar el usuario' });
};

const iniciarSesion = async (req: Request, res: Response) => {
	const { usuario, password } = req.body;

	// Validar que los datos no estén vacíos
	if (!usuario || !password) {
		res.status(400).json({ message: 'Campos incompletos' });
		return;
	}

	// Validar que el usuario no exista
	const usuarioExiste = await usuariosService.getUsuarioByNombre(usuario);

	if (usuarioExiste) {
		if (password == usuarioExiste.password) {
			// Guardar el ID del usuario en la sesión
			req.session.idUsuario = usuarioExiste.id;

			// Respuesta al encontrar al usuario
			res.status(201).json({
				id: usuarioExiste.id,
				usuario: usuarioExiste.usuario,
				foto_perfil: usuarioExiste.foto_perfil
			});
			return;
		}
		// En caso de que no se haya ingresado una contraseña valida o un usuario valido
		res.status(500).json({ message: 'Contraseña y/o usuario incorrectos' });
		return;
	}

	// En caso de que no se haya ingresado una contraseña valida o un usuario valido
	res.status(500).json({ message: 'Contraseña y/o usuario incorrectos' });
};

const cerrarSesion = async (req: Request, res: Response) => {
	if (!req.session.idUsuario) {
		res.status(401).json({ message: 'No hay sesión iniciada' });
		return;
	}

	// eliminamos la sesión
	req.session.destroy(err => {
		if (err) {
			res.status(400).send({ message: 'Error al cerrar sesión' });
		} else {
			res.send({ message: 'Sesión cerrada correctamente' });
		}
	});
};

const whoami = async (req: Request, res: Response) => {
	const { idUsuario } = req.session;

	if (!idUsuario) {
		res.status(401).json({ message: 'No hay sesión iniciada' });
		return;
	}

	const data = await usuariosService.getUsuario(idUsuario);
	delete data.password;

	res.status(200).json(data);
};

export default {
	getUsuarios,
	registrarUsuario,
	iniciarSesion,
	cerrarSesion,
	whoami
};
