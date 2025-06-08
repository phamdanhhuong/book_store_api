### API dàng cho ứng dụng bán sách

## Chuẩn bị database: chạy script trên mysql
```bash
script/book_store.sql
```
## Sửa thông tin database trong file src/config/ormconfig.ts
```
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
```
## Project setup

```bash
$ npm install
```

## Chạy project

```bash
$ npm run start
```
