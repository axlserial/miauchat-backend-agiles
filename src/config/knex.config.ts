import knex from 'knex';
import constants from '../constants';

const db = knex({
	client: 'mysql',
	connection: {
		host: constants.host,
		port: constants.db_port,
		user: constants.user,
		password: constants.password,
		database: constants.dbname,
		ssl: constants.environment === 'production' ? { rejectUnauthorized: true } : false
	}
});

export default db;
