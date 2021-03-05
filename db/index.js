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
        .catch(err => {
            throw error;
        })
    }

    showRoles() {
        return this.connection.promise().query(
            'SELECT * FROM roles'
        )
        .catch(err => {
            throw error;
        })
    }

    showEmployees() {
        return this.connection.promise().query(
            'SELECT * FROM employees'
        )
        .catch(err => {
            throw error;
        })
    }

    addDepartment(department) {
        return this.connection.promise().query(
            'INSERT INTO departments SET ?',
            {
                name: department
            }
        )
        .catch(err => {
            throw error;
        })
    }

    addRole(role, salary, department_id) {
        return this.connection.promise().query(
            'INSERT INTO departments SET ?',
            {
                title: role,
                salary: salary,
                department_id: department_id
            }
        )
        .catch(err => {
            throw error;
        })
    }

}

module.exports = new employee_db(connection);