import server from './config/express.config';
import constants from './constants';

// Start server
server.listen(constants.app_port, () => {
	console.log(`Servidor corriendo en el puerto \x1b[33m${constants.app_port}`);
});
