let mysql = require("mysql");
let pool = mysql.createPool({
  host: "sql9.freesqldatabase.com",
  port: 3306,
  user: "sql9582526",
  password: "jLJmB8FIU6",
  database: "sql9582526",
  connectionLimit: 100,
  insecureAuth: true,
  multipleStatements: true,
});

module.exports = pool;
