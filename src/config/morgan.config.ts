import morgan from 'morgan';
import { join } from 'path';
import fs from 'fs';

// Configuración de morgan
const morganConfig = (logs: string) => {
	// Si estamos en desarrollo, devolvemos morgan('dev')
	if (logs === 'dev') return morgan('dev');
	// Si no, devolvemos morgan('common') con el stream de logs
	else
		return morgan('short', {
			stream: fs.createWriteStream(join(__dirname, '../../logs/access.log'), {
				flags: 'a'
			})
		});
};

export default morganConfig;
