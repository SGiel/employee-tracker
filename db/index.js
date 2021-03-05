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
            `SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name as department, 
            roles.salary, CONCAT(e.first_name, ' ', e.last_name) AS manager, employees.manager_id
            FROM employees 
            LEFT JOIN roles ON employees.role_id = roles.id
            LEFT JOIN departments  ON roles.department_id = departments.id
            LEFT JOIN employees AS e ON employees.manager_id = e.id`
        )
    }

    showDepartmentEmployees(departmentID) {
        return this.connection.promise().query(
            `SELECT name as department, employees.id, first_name, last_name, title
            FROM employees 
            LEFT JOIN roles ON employees.role_id = roles.id
            LEFT JOIN departments ON roles.department_id = departments.id
            WHERE ?`,
            {
                department_id: departmentID
            }
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

    deleteDepartment(departmentID) {
        return this.connection.promise().query(
            'DELETE FROM departments WHERE ?',
            {
                id: departmentID
            }
        )
        .catch(err => {
            throw error;
        })
    }

    deleteRole(roleID) {
        return this.connection.promise().query(
            'DELETE FROM roles WHERE ?',
            {
                id: roleID
            }
        )
        .catch(err => {
            throw error;
        })
    }


    addEmployee(firstName, lastName, roleID, managerID) {
        let manager_id;
        if (!(managerID === 0)) {
            manager_id = managerID
        }
        return this.connection.promise().query(
            'INSERT INTO employees SET ?',
            {
                first_name: firstName,
                last_name: lastName,
                role_id: roleID,
                manager_id: manager_id
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
    updateEmployeeRole(employee_id, roleID) {
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

    // updates an Employees role
    updateEmployeeManager(employee_id, managerID) {
        let manager_id;
        if (!(managerID === 0)) {
            manager_id = managerID
        }
        return this.connection.promise().query(
            'UPDATE employees SET ? WHERE ?',
            [
                {
                    manager_id: manager_id
                },
                {
                    id: employee_id
                }
            ]
        )
        .catch(err => {
            throw error;
        })
    }


}


module.exports = new employee_db(connection);