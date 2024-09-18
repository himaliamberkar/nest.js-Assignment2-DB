import { DataSource } from 'typeorm';
// Import other entities

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 8000,
  username: 'root',
  password: 'rootuser',
  database: 'nest_schema1',
  "entities": ["src/**/*.entity.ts"],
  migrations: [__dirname + '/src/migrations/**/*{.ts,.js}'],
  synchronize: false,
});