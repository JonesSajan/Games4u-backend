let mysql = require("mysql");
let pool = mysql.createPool({
  host: "sql6.freesqldatabase.com",
  port: 3306,
  user: "sql6505636",
  password: "wr2NBHFR1d",
  database: "sql6505636",
  connectionLimit: 100,
  insecureAuth: true,
  multipleStatements: true,
});

module.exports = pool;
