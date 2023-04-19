import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

export default (): TypeOrmModuleOptions => {
  const DatabaseProvider: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'booktop',
    entities: [
      join(__dirname, '..', '..', 'api', '**', 'entities', '*.entity.{ts,js}'),
    ],
    migrations: [join(__dirname, 'migrations', '*.{ts,js}')],
    synchronize: true,
  };

  return DatabaseProvider;
};
