import request from 'supertest';

import server from '../src/config/express.config';

describe('Test express.config.ts', () => {
	test('Home route', async () => {
		const res = await request(server).get('/');
		expect(res.body).toEqual({ message: 'API de la aplicación MiauChat' });
	});
});
