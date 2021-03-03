const express = require('express');

//const PORT = process.env.PORT || 3001;
const app = express();

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
    console.log('connected as id ' + connection.threadId);
    afterConnection();
});
  
afterConnection = () => {
    connection.query('SELECT * FROM departments', function(err, res) {
        if (err) throw err;
        console.log(res);
        connection.end();
    });
};
  
//const db = require('./db/employee_db');

const apiRoutes = require('./routes/apiRoutes');

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Use apiRoutes
app.use('/api', apiRoutes);

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

// Start server after DB connection
// db.on('open', () => {
//   app.listen(PORT, () => {
//     console.log(`Server running on port http://localhost:${PORT}`);
//   });
// });