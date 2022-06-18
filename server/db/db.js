const mysql = require("mysql2");
require("dotenv").config();

const baseConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
}

const database = process.env.DB_DATABASE

const tempConnection = mysql.createConnection(baseConfig)

tempConnection.query(`CREATE DATABASE IF NOT EXISTS ${database};`)

const connection = mysql.createConnection({
  ...baseConfig,
  database,
});

module.exports = connection;
