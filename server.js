const Employee_db = require('./db/');
const {prompt} = require('inquirer');
const {table} = require('table');
const cTable = require('console.table');
const inquirer = require('inquirer');

const startQuestion = [
    {
        type: 'list',
        name: 'startQuestion',
        message: 'What would you like to do?',
        choices: ['View All Departments',
            'View All Roles',
            'View All Employees',
            'View Employees by Department',
            'Add a Department',
            'Add a Role',
            'Add an Employee',
            'Update an Employee Role',
            'Update an Employee Manager',
            'Delete a Department',
            'Delete a Role',
            'Delete an Employee',
            'Exit Employee Tracker']
    }
];

const addDepartmentQuestion = [
    {
        type: 'input',
        name: 'departmentName',
        message: 'Please enter the new department name:',
        validate: nameInput => {
            if (nameInput) {
              return true;
            } else {
              console.log("Please enter a department name");
              return false;
            }
        },
    }
]

const employeeByDeptQuestions = (departmentsArray) => {
    
    let departments = departmentsArray;
    return prompt([
        {
            type: 'list',
            name: 'department',
            message: "Please choose the department where you would like to view employees:",
            choices: departments.map(department => ({value: department.id, name: department.department}))
        }
    ])
}

const addRoleQuestions = (departmentsArray) => {
    let departments = departmentsArray;
    return prompt(
        [
            {
                type: 'input',
                name: 'roleName',
                message: 'Please enter a new role:',
                validate: nameInput => {
                    if (nameInput) {
                      return true;
                    } else {
                      console.log("Please enter a role.");
                      return false;
                    }
                },
            },
            {
                type: 'input',
                name: 'salary',
                message: 'Please enter the salary for the role:',
                validate: idInput => {
                    if (idInput.match(/^[0-9]+$/) && idInput.length > 0) {
                        return true;
                    } else {
                        console.log("Invalid entry. Please enter the salary with no commas, $ or other non-numeric characters.");
                        return false;
                    }
                }
            },
            {
                type: 'list',
                name: 'department',
                message: 'Please choose the department for the role:',
                choices: departments.map(department => ({value: department.id, name: department.department}))
            }
        ]
    )
}

addEmployeeQuestions = (ids) => {
    return prompt(
        [
            {
                type: 'input',
                name: 'firstName',
                message: 'First name:',
                validate: nameInput => {
                    if (nameInput) {
                      return true;
                    } else {
                      console.log("Please enter the first name:");
                      return false;
                    }
                },
            },
            {
                type: 'input',
                name: 'lastName',
                message: 'Last name:',
                validate: nameInput => {
                    if (nameInput) {
                      return true;
                    } else {
                      console.log("Please enter the last name:");
                      return false;
                    }
                },
            },
            {
                type: 'list',
                name: 'role',
                message: 'Please choose the role for the employee:',
                choices: ids.roles
            },
            {
                type: 'list',
                name: 'manager',
                message: "Please choose the manager for this employee:",
                choices: ids.employees
            }
        ]
    )
}

const updateEmployeeRoleQuestions = (ids) => {
    return prompt(
        [
            {
                type: 'list',
                name: 'employee',
                message: "Please choose the employee you would like to update:",
                choices: ids.employees
            },
            {
                type: 'list',
                name: 'role',
                message: "Please choose the role for the employee:",
                choices: ids.roles
            }
        ]
    )
}

const deleteDepartmentQuestion = (departments) => {
    return prompt(
        [
            {
                type: 'list',
                name: 'department',
                message: "Please choose the department you would like to delete:",
                choices: departments
            }
        ]
    )
}

const deleteRoleQuestion = (roles) => {
    return prompt(
        [
            {
                type: 'list',
                name: 'role',
                message: "Please choose the role you would like to delete:",
                choices: roles
            }
        ]
    )
}

const deleteEmployeeQuestion = (employees) => {
    return prompt(
        [
            {
                type: 'list',
                name: 'employee',
                message: "Please choose the employee you would like to delete:",
                choices: employees
            }
        ]
    )
}

const viewDepartments = () => {
    Employee_db.showDepartments()
    .then (([data]) => {
        const departments = data;
        console.log('\n');
        console.table(departments);
        console.log('\n')
    })
    .then ( () => {
        promptUser()
    })
}

const viewRoles = () => {
    Employee_db.showRolesDepartments()
    .then (([data]) => {
        const roles = data;
        console.log(`\n`)
        console.table(roles);
        console.log('\n')
    })
    .then ( () => {
        promptUser()
    })
}

const viewEmployees = () => {
    Employee_db.showEmployeesRolesManagers()
    .then (([data]) => {
        // below removes manager_id from the employees object
        const employees = data.map(employee => ({
            id: employee.id,
            first_name: employee.first_name,
            last_name: employee.last_name,
            title: employee.title,
            department: employee.department,
            salary: employee.salary,
            manager: employee.manager
        }))
        console.log('\n')
        console.table(employees)
        console.log('\n')
    })
    .then ( () => {
        promptUser()
    })
}
const viewEmployeesByDepartment = () => {
    Employee_db.showDepartments()
    .then (([data]) => {
        const departments = data;
        return departments;
    })

    .then (departments => {
        return employeeByDeptQuestions(departments)
    })
    .then(answers => { 
        Employee_db.showDepartmentEmployees(parseInt(answers.department))
        .then (([data]) => {
            const departmentEmployees = data;
            console.log('\n')
            console.table(departmentEmployees);
            console.log('\n')
            return
        })  
        .then ( () => {
            promptUser()
        })
   })
};

const addDepartment = () => {
    return prompt(addDepartmentQuestion)
    .then((res) => { 
        Employee_db.addDepartment(res.departmentName)
        console.log('\n\nThe new Department: ' + `${res.departmentName}` + ' has been added\n');
    })
    .then ( () => {
        promptUser()
    })
};

const addRole = () => {
    Employee_db.showDepartments()
    .then (([data]) => {
        const departments = data;
        return departments;
    })
    .then (departments =>{
        return addRoleQuestions(departments);
    })
    .then(answers => { 
         Employee_db.addRole(answers.roleName, parseInt(answers.salary), parseInt(answers.department))
         console.log('\n\nThe new role: ' + `${answers.roleName}` + ' has been added \n');
    })
    .then ( () => {
        promptUser()
    })
};

const addEmployee = () => {
    const ids = [];
    Employee_db.showRoles()
    .then (([data]) => {
        if (data) {
            ids.roles = data.map(role => ({
                value: role.id,
                name: role.title
            }));
        }
        return ids;
    })
    .then (ids => {
        Employee_db.showEmployeesRolesManagers()
        .then (([data]) => {
            if (data) {
                ids.employees = data.map(employee => ({
                    value: employee.id,
                    name: employee.first_name + ' ' + employee.last_name+ ', ' + employee.title
                })).filter(employee => (employee.name.indexOf('Lead') > -1));
                ids.employees.push({
                    value: 0,
                    name: 'No manager for this employee'
                })
            }
            return ids;
        })
        .then (ids => {
            return addEmployeeQuestions(ids)
        })
        .then(answers => { 
            Employee_db.addEmployee(answers.firstName, answers.lastName, parseInt(answers.role), parseInt(answers.manager))
            console.log('\n\nThe new employee: ' + `${answers.firstName}` + ' ' + `${answers.lastName}` + ' has been added \n');
       })
       .then ( () => {
          promptUser()
       })
    })
};

const updateEmployeeRole = () => {
    const ids = [];
    Employee_db.showEmployees()
    .then (([data]) => {
        if (data) {
            ids.employees = data.map(employee => ({
                value: employee.id,
                name: employee.first_name + ' ' + employee.last_name
            }));
        }
        return ids;
    })
    .then (ids => {
        Employee_db.showRoles()
        .then (([data]) => {
            if (data) {
                ids.roles = data.map(role => ({
                    value: role.id,
                    name: role.title
                }));
            }
            return ids;
        })
        .then (ids => {
            return updateEmployeeRoleQuestions(ids)
        })
        .then(answers => { 
            Employee_db.updateEmployeeRole(parseInt(answers.employee), parseInt(answers.role))
            console.log('\n\nThe employee role is updated \n');
       })
       .then ( () => {
          promptUser()
        })
    })
};

const updateEmployeeManager = () => {
    let id = []
    Employee_db.showEmployeesRolesManagers()
    .then (([data]) => {
        let ids = [];
        if (data) {
            ids.employees = data.map(employee => ({
                value: employee.id,
                name: employee.first_name + ' ' + employee.last_name
            }));
            ids.managers = data.map(manager => ({
                value: manager.id,
                name: manager.first_name + ' ' + manager.last_name + ', ' + manager.title
            })).filter(manager => (manager.name.indexOf('Lead') > -1))
            ids.managers.push({
                value: 0,
                name: 'No manager for this employee'
            })
        }
        return ids;
    })
    .then (ids => {
        return prompt(
            [
                {
                    type: 'list',
                    name: 'employee',
                    message: "Please choose the employee you would like to update:",
                    choices: ids.employees,
                }
            ]
        )
        .then (employeeAnswer => {
            id.employee = employeeAnswer;
            return prompt (
                [
                    {
                        type: 'list',
                        name: 'manager',
                        message: "Please choose the manager for the employee:",
                        choices: ids.managers.filter(manager => id.employee.employee !== manager.value)
                    }
                ]
            )
            .then (managerAnswer => {
                id.manager = managerAnswer;
                console.log("managaerAnswer", id)
                return;
            })
        })
    })
    .then ( () => {
        Employee_db.updateEmployeeManager(parseInt(id.employee.employee), parseInt(id.manager.manager))
        console.log('\n\nThe employee manager is updated \n');
    })
    .then ( () => {
        promptUser()
    })

};

const deleteDepartment = () => {
    Employee_db.showDepartments()
    .then (([data]) => {
        let departmentArray = [];
        if (data) {
            departmentArray = data.map(department => ({
                value: department.id,
                name: department.department
            }));
        }
        return departmentArray;
    })
    .then (departments => {
        return deleteDepartmentQuestion(departments)
    })
    .then(answers => { 
        Employee_db.deleteDepartment(parseInt(answers.department))
        console.log('\n\nThe department has been deleted. \n');
    })
    .then ( () => {
        promptUser()
    })
};

const deleteRole = () => {
    Employee_db.showRoles()
    .then (([data]) => {
        let roleArray = [];
        if (data) {
            roleArray = data.map(role => ({
                value: role.id,
                name: role.title
            }));
        }
        return roleArray;
    })
    .then (roles => {
        return deleteRoleQuestion(roles)
    })
    .then(answers => { 
        Employee_db.deleteRole(parseInt(answers.role))
        console.log('\n\nThe role has been deleted. \n');
    })
    .then ( () => {
        promptUser()
    })
};

const deleteEmployee = () => {
    Employee_db.showEmployees()
    .then (([data]) => {
        let employeeArray = [];
        if (data) {
            employeeArray = data.map(employee => ({
                value: employee.id,
                name: employee.first_name + ' ' + employee.last_name
            }));
        }
        return employeeArray;
    })
    .then (employees => {
        return deleteEmployeeQuestion(employees)
    })
    .then(answers => { 
        Employee_db.deleteEmployee(parseInt(answers.employee))
        console.log('\n\nThe employee has been deleted. \n');
    })
    .then ( () => {
        promptUser()
    })
};


const promptUser = () => {
    console.log('\n')
    return prompt(startQuestion)
    .then(answer => { 
        console.clear()
        if (`${answer.startQuestion}` === 'View All Departments') {
            viewDepartments()
        } else if (`${answer.startQuestion}` === 'View All Roles') {
            viewRoles()
        } else if (`${answer.startQuestion}` === 'View All Employees') {
            viewEmployees()
        } else if (`${answer.startQuestion}` === 'View Employees by Department') {
            viewEmployeesByDepartment()
        } else if (`${answer.startQuestion}` === 'Add a Department') {
            addDepartment()
        } else if (`${answer.startQuestion}` === 'Add a Role') {
            addRole()
        } else if (`${answer.startQuestion}` === 'Add an Employee') {
            addEmployee()
        } else if (`${answer.startQuestion}` === 'Update an Employee Role') {
            updateEmployeeRole()
        } else if (`${answer.startQuestion}` === 'Update an Employee Manager') {
            updateEmployeeManager()
        } else if (`${answer.startQuestion}` === 'Delete a Department') {
            deleteDepartment()
        } else if (`${answer.startQuestion}` === 'Delete a Role') {
            deleteRole()
        } else if (`${answer.startQuestion}` === 'Delete an Employee') {
            deleteEmployee()
        } else if (`${answer.startQuestion}` === 'Exit Employee Tracker') {
            console.log('\n_______________________________________________');
            console.log('\nThank you for using Employee Tracker! Goodbye.\n');
            console.log('_______________________________________________\n');
            Employee_db.connection.end();
            return;
        }
    })
    .catch(err => {
        console.log(err);
    });
};

const start = () => {
    console.log('____________________________\n')
    console.log('WELCOME TO EMPLOYEE TRACKER!')
    console.log('____________________________')
    promptUser()
}

start()
