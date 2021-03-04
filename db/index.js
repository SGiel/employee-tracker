const mysql = require('mysql2');
const connection = require('./connection');

class employee_db {
    constructor(connection) {
        this.connection = connection;
    }

    showDepartments() {
        return this.connection.promise().query(
            'SELECT * FROM departments'
        )
        .then (([data]) => {
            console.log(([data]));
        })
        .catch(err => {
            throw error;
        })
    };
}

module.exports = employee_db;