import { join } from 'path';
import express, { Express } from 'express';

const clientConfig = (app: Express) => {
	app.use('/miauchat', express.static(join(__dirname, '../../client')));
	app.get('/miauchat/*', (req, res) => {
		res.sendFile(join(__dirname, '../../client/index.html'));
	});
};

export default clientConfig;
