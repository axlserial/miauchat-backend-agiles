/**
 * Constantes comunes en todos los entornos (dev, prod)
 */
export const COMMON_CONSTANTS = {
	app_port: Number(process.env.APP_PORT),
	host: process.env.HOST as string,
	db_port: Number(process.env.DB_PORT),
	user: process.env.USER as string,
	password: process.env.PASSWORD as string,
	dbname: process.env.DBNAME as string,
	session_secret: process.env.SESSION_SECRET as string
};
