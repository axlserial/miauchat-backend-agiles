import request from 'supertest';

import server from '../src/config/express.config';

describe('Test salas', () => {
	test('getSalas route', async () => {
		const res = await request(server).get('/api/v1/salas/');
		expect(res.statusCode).toEqual(200);
	});
    
    test('getSalasById route', async () => {
        const id_usuario=1;
		const res = await request(server).get('/api/v1/salas/getSalasById').send({ creador_id: id_usuario });
		expect(Array.isArray(res.body.message)).toBe(true);
	});
    
	
	test('getSalasUsuario route', async () => {
        const usuario_id = '1';
		const res = await request(server).get('/api/v1/salas/salas-usuario/'+ usuario_id);
        expect(Array.isArray(res.body)).toBe(true);
	});

    test('crearSala route', async () => {
        const id = 'Abc12QzcST'
        const creador_id = 1;
        const nombre_sala = 'Sala de Prueba rep1A';
        const res = await request(server)
          .post('/api/v1/salas/crear')
          .send({ id, creador_id, nombre_sala });
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('creador_id', creador_id);
        expect(res.body).toHaveProperty('nombre_sala', nombre_sala);
      });
    
	test('addParticipante route', async () => {
        const usuario_id = '1';
		const sala_id = 'XWYAqDXn04';
		const res = await request(server).post('/api/v1/salas/addParticipante').send({usuario_id, sala_id});
		expect(res.statusCode).toEqual(201);
	});

    test('participantes route',async () => {
        const sala_id = "pVHvoUeP74";
        const res = await request(server).get(`/api/v1/salas/participantes/${sala_id}`);
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true); 
    });

	test('eliminarParticipante route', async () => {
        const usuario_id = "1";
		const sala_id = 'J7LvxJwn5H';
		const res = await request(server).delete(`/api/v1/salas/eliminar-participante/${usuario_id}/${sala_id}`);
        expect(res.body.message).toBe('Usuario eliminado con éxito');
	});

    test('cambiarNombreSala route', async () => {
        const sala_id = 'J7LvxJwn5H';
        const nuevo_nombre = 'Nuevo nombre de sala';
        const res = await request(server)
          .put('/api/v1/salas/cambiarNombreSala')
          .send({ sala_id, nuevo_nombre });
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual('Nombre de Sala modificado con éxito');
      });
    
    test('eliminarSala route', async () => {
		const sala_id = '9KRp0ZJ3Vg';
		const res = await request(server).delete(`/api/v1/salas/eliminarSala/${sala_id}`);
        expect(res.body.message).toBe('Sala eliminada con éxito');
	});

    test('cambiarAdmiSala route', async () => {
		const sala_id = 'pVHvoUeP74';
        const Nuevo_Creador_id = '2';
		const res = await request(server).put(`/api/v1/salas/cambiarAdmiSala/${Nuevo_Creador_id}/${sala_id}`);
        expect(res.body).toEqual({ message: 'Administrador de la sala modificado con éxito' });
	});

});