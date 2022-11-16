let mysql = require("mysql");
let pool = mysql.createPool({
  host: "sql7.freesqldatabase.com",
  port: 3306,
  user: "sql7575340",
  password: "apanZt42Cb",
  database: "sql7575340",
  connectionLimit: 100,
  insecureAuth: true,
  multipleStatements: true,
});

module.exports = pool;
