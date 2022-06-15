import express from 'express';
import commonRoutes from './router';

const app = express();

require('dotenv').config({ path: './process.env' });

app.use('/', commonRoutes);

export default app;
