let mysql = require("mysql");
let pool = mysql.createPool({
  host: "remotemysql.com",
  port: 3306,
  user: "qrLbOiQxfS",
  password: "zSV8aphHyi",
  database: "qrLbOiQxfS",
  connectionLimit: 100,
  insecureAuth: true,
  multipleStatements: true,
});

module.exports = pool;
