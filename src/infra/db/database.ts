import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

export default (): TypeOrmModuleOptions => {
  const DatabaseProvider: TypeOrmModuleOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [
      join(__dirname, '..', '..', 'app', '**', 'entities', '*.entity.{ts,js}'),
    ],
    migrations: [join(__dirname, 'migrations', '*.{ts,js}')],
    synchronize: true,
  };

  return DatabaseProvider;
};
