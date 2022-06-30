let mysql = require("mysql");
let pool = mysql.createPool({
  host: "sql5.freesqldatabase.com",
  port: 3306,
  user: "sql5502477",
  password: "hCrcIIlGLt",
  database: "sql5502477",
  connectionLimit: 100,
  insecureAuth: true,
  multipleStatements: true,
});

module.exports = pool;




