import { DataSource, DataSourceOptions } from "typeorm";


export const DataSourceOption: DataSourceOptions={
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'book_store',
    password: '1234',
    database: 'book_store',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: true
}