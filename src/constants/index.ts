import { join } from 'path';
import { config } from 'dotenv';

// Obtenemos el entorno de ejecución
const ENV = process.env.NODE_ENV || 'development';

// Cargamos las variables de entorno
config({
	path: join(__dirname, '../../.env')
});

// Importamos las constantes
import { COMMON_CONSTANTS } from './constants.common';
import { DEV_CONSTANTS } from './constants.dev';
import { PROD_CONSTANTS } from './constants.prod';

// Obtenemos el entorno de ejecución

// Definimos las constantes
const constants = {
	...COMMON_CONSTANTS,
	...(ENV === 'development' ? DEV_CONSTANTS : PROD_CONSTANTS)
};

export default constants;
