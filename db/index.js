const mysql = require('mysql2');
const connection = require('./connection');

class employee_db {
    constructor(connection) {
        this.connection = connection;
    }

    showDepartments() {
        return this.connection.promise().query(
            'SELECT id, name as department FROM departments'
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

    showRolesDepartments() {
        return this.connection.promise().query(
            `SELECT roles.id, title, departments.name as department, salary
            FROM roles
            LEFT JOIN departments ON roles.department_id = departments.id`
        )
    }

    showEmployeesRolesManagers() {
        return this.connection.promise().query(
            `SELECT employees.id, first_name, last_name, title, name as department, salary
            FROM employees 
            LEFT JOIN roles ON employees.role_id = roles.id
            LEFT JOIN departments  ON roles.department_id = departments.id`
        )
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

    addRole(role, role_salary, departmentID) {
        return this.connection.promise().query(
            'INSERT INTO roles SET ?',
            {
                title: role,
                salary: role_salary,
                department_id: departmentID
            }
        )
        .catch(err => {
            throw error;
        })
    }

    addEmployee(firstName, lastName, roleID, managerID) {
        return this.connection.promise().query(
            'INSERT INTO employees SET ?',
            {
                first_name: firstName,
                last_name: lastName,
                role_id: roleID,
                manager_id: managerID
            }
        )
        .catch(err => {
            throw error;
        })
    }

    deleteEmployee(employeeID) {
        return this.connection.promise().query(
            'DELETE FROM employees WHERE ?',
            {
                id: employeeID
            }
        )
        .catch(err => {
            throw error;
        })
    }

    // updates an Employees role
    updateEmployee(employee_id, roleID) {
        return this.connection.promise().query(
            'UPDATE employees SET ? WHERE ?',
            [
                {
                    role_id: roleID
                },
                {
                    id: employee_id,
                }
            ]
        )
        .catch(err => {
            throw error;
        })
    }

}

module.exports = new employee_db(connection);