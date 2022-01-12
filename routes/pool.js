let mysql = require("mysql");
let pool = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '1234',
    database: 'gamezone',
    connectionLimit: 100,
    insecureAuth: true,
    multipleStatements: true
})

module.exports = pool