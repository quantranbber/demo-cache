import dotenv from 'dotenv';
import HTTP from 'http';
import {Database} from './db';
import app from './app';

const result = dotenv.config();
if (result.error) {
  dotenv.config({ path: './process.env' });
}

const port = process.env.PORT;
const http = new HTTP.Server(app);

Database.getConnection().then(() => {
    http.listen(port, (): void => {
        console.log('\x1b[36m%s\x1b[0m', // eslint-disable-line
            `🌏 Express server started at http://localhost:${port}`);
    });
})
