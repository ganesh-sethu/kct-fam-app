const mysql = require("mysql2");
require("dotenv").config();

const baseConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
}

const database = process.env.DB_DATABASE

console.log(baseConfig);
console.log("database",database);

const tempConnection = mysql.createConnection(baseConfig)

tempConnection.query(`CREATE DATABASE IF NOT EXISTS ${database};`)
console.log("tempConnection");
const connection = mysql.createConnection({
  ...baseConfig,
  database,
});

module.exports = connection;
