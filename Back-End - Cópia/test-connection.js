"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var dataSource = new typeorm_1.DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'persistence',
    entities: [],
    synchronize: false,
});
dataSource.initialize()
    .then(function () {
    console.log('Data Source has been initialized!');
})
    .catch(function (err) {
    console.error('Error during Data Source initialization:', err);
});
