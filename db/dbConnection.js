const mysql = require("mysql");

const sqlConnection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "danitalita2354",
  database: "db_tarefas",
});

module.exports = sqlConnection;
