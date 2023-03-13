import cors from 'cors';

// lista de dominios que pueden acceder a la API
const whitelist = ['http://localhost:5173'];

// configuracion de CORS
export const options: cors.CorsOptions = {
	credentials: true,
	origin: whitelist
};

export default () => cors(options);
