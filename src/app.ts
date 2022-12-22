import express from 'express';
import commonRoutes from './router';
import {useContainer} from "typeorm";
import {Container} from "typedi";

const app = express();
useContainer(Container);

require('dotenv').config({ path: './process.env' });

app.use('/', commonRoutes);

export default app;
