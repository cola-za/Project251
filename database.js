const mysql = require("mysql2");

const MYSQL_USERNAME = "root",
MYSQL_PASSWORD = "colafifa02", 
MYSQL_HOSTNAME = "localhost",
MYSQL_PORT = "3306",
MYSQL_DB = "restaurant";
const dbConnectionString = `mysql://${MYSQL_USERNAME}:${MYSQL_PASSWORD}@${MYSQL_HOSTNAME}:${MYSQL_PORT}/${MYSQL_DB}`;
const db = mysql.createConnection(dbConnectionString);


module.exports = db;