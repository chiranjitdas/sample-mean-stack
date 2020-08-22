'user strict';

const mysql = require('mysql');

//local mysql db connection
const dbConn = mysql.createConnection({
	host: 'localhost',
	user: 'chiranjitdas',
	password: 'mysql@2020',
	database: 'interview'
});
dbConn.connect(function (err) {
	if (err) throw err;
	console.log("Database Connected!");
});
module.exports = dbConn;
