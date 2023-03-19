import { customAlphabet } from 'nanoid/async';
import constants from '../constants';

/**
 * Función generadora de ID's de tamaño 10 (caracteres).
 */
const nanoid = customAlphabet(constants.alphabet, 10);

export default nanoid;
