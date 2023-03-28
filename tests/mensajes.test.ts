import request from 'supertest';

import server from '../src/config/express.config';

describe('Test express.config.ts', () => {
	test('getMensajes route', async () => {
		const res = await request(server).get('/api/v1/mensajes/');
		expect(res.status).toBe(200);
        expect(res.body).toBeDefined();
	});

    test('Debería devolver todos los mensajes de la sala', async () => {
        const sala_id = 'G3QRJ8TO7Y'; // id de la sala a consultar
        const res = await request(server).get(`/mensajes-sala/${sala_id}`);
        expect(res.body).toBeDefined();
    });

    test('Debería descargar un archivo adjunto', async () => {
        // Hacer una petición GET a la ruta /adjunto/nombre_del_archivo
        const res = await request(server).get('/adjunto/nombre_del_archivo');
        
        // Verificar que el encabezado Content-Disposition sea attachment y que el nombre del archivo coincida
        expect(res.headers['content-disposition']);
        
        // Verificar que el tipo de contenido sea application/octet-stream (binario)
        expect(res.headers['content-type']).toBe('application/json; charset=utf-8');
      });
});
