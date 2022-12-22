import { Connection, createConnection } from 'typeorm';
import { ConnectionOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { parse, ConnectionOptions as parseOptions } from 'pg-connection-string';
import * as entities from './entity';

interface CustomOptions extends parseOptions {
  schema: string;
}

require('dotenv').config({ path: './process.env' });

const db = parse(process.env.DB_URL) as CustomOptions;
export const schema = db.schema || 'public';
export const connectionOptions: ConnectionOptions = {
  type: 'postgres',
  host: db.host,
  port: Number(db.port),
  schema: schema,
  database: db.database,
  username: db.user,
  password: db.password,
  logging: ['query', 'error'],
  entities: Object.values(entities),
  namingStrategy: new SnakeNamingStrategy(),
  extra: {
    // set pool max size to 1
    max: 1,
    // close idle clients after 1 second
    idleTimeoutMillis: 1000,
  },
};


export class Database {
  private static connection: Connection;

  static async getConnection(): Promise<Connection> {
    if (!this.connection || !this.connection.isConnected) {
      console.info('Start connect database');
      this.connection = await Database.getDBConnect();
      console.info('Connected to database');
    }

    return this.connection;
  }

  static async getDBConnect({
                              retries = 1,
                              maxRetries = 3,
                            }: {
    retries?: number;
    maxRetries?: number;
  } = {}): Promise<Connection> {
    try {
      return await createConnection(connectionOptions);
    } catch (error) {
      if (retries < maxRetries) {
        console.info('ERROR DB connection:', error);
        console.info('Retry DB connection times:', retries++);
        return Database.getDBConnect({ retries, maxRetries });
      }

      console.error('UNHANDLED ERROR DB connection after 3 times');
      throw error;
    }
  }
}
