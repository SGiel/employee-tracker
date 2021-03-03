const express = require('express');
const router = express.Router();

const mysql = require('mysql2');

// Create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    port: `3306`,
    // Your MySQL username
    user: 'root',
    // Your MySQL password
    password: 'root',
    database: 'employee_db'
});

connection.connect(err => {
    if (err) throw err;
    console.log('connected as id ' + connection.threadId + '\n');
    readDepartments();
});

readDepartments = () => {
    console.log('Selecting all departments...\n');
    connection.query('SELECT * FROM departments', function(err, res) {
      if (err) throw err;
      // Log all results of the SELECT statement
      console.log(res);
      connection.end();
    });
};
  
//const db = require('employee_db');

// Get all departments
// router.get('/departments', (req, res) => {
//     const sql = `SELECT * FROM departments`
//     db.all(sql, params, (err, rows) => {
//         if (err) {
//             res.status(500).json({ error: err.message });
//             return;
//         }
//         res.json({
//             message: 'success',
//             data: rows
//         });
//     });
// });

module.exports = connection;