const Employee_db = require('./db/');
const {prompt} = require('inquirer');
const {table} = require('table');

const startQuestion = [
    {
        type: 'list',
        name: 'startQuestion',
        message: 'What would you like to do?',
        choices: ['View All Departments',
            'View All Roles',
            'View All Employees',
            'Add a Department',
            'Add a Role',
            'Add an Employee',
            'Update an Employee Role',
            'Delete an Employee',
            'Exit Employee Tracker']
    }
];
// HOW VALIDATE THAT THE DEPARTMENT NAME DOESN'T ALREADY EXIST???
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

const addRoleQuestions = [
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
        choices: ['department1', 'department2']
    }
];

const addEmployeeQuestions = [
    {
        type: 'input',
        name: 'employeeFirstName',
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
        name: 'employeeLasttName',
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
        choices: ['Sales Lead',
            'Sales Person',
            'Lead Engineer',
            'Software Engineer',
            'Accountant',
            'Legal Team Lead',
            'Lawyer']
    },
    {
        type: 'input',
        name: 'managerName',
        message: "Please enter the manager's name:",
        validate: nameInput => {
            if (nameInput) {
              return true;
            } else {
              console.log("Please enter the manager's name.");
              return false;
            }
        },
    }
];

const updateEmployeeRoleQuestions = [
    {
        type: 'input',
        name: 'Employee id',
        message: 'Enter employee id',
        validate: idInput => {
            if (idInput.match(/^[0-9]+$/) && idInput.length > 0) {
                return true;
            } else {
                console.log("Invalid entry. Please enter the Employee ID.");
                return false;
            }
        },
    },
    {
        type: 'list',
        name: 'role',
        message: 'Please choose the new role for the employee:',
        choices: `[['Sales Lead',
            'Sales Person',
            'Lead Engineer',
            'Software Engineer',
            'Accountant',
            'Legal Team Lead',
            'Lawyer']]`
    }
];

const viewDepartments = () => {
    Employee_db.showDepartments()
    .then (([data]) => {
        // const departments = []
        // departments.id= data.map(data => data.id)
        // departments.name = data.map(data => data.name)
        const departments = data;
        console.log('\n');
        console.table(departments);
        console.log('\n')
        //const transformed = test.reduce((acc, {id, ...x}) => { acc[id] = x; return acc}, {})
        //console.table(transformed)
        //let output = table(departments, config)
        //console.log(output);
        // const departments = data.map(department => department.name)
        // console.log('\n\nThe Departments\n');
        // departments.forEach(department => console.log(department));
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
        // const roles = data.map(role => role.title)
        // console.log('\n\nThe Roles\n');
        // roles.forEach(role => console.log(role));
    })
    .then ( () => {
        promptUser()
    })
}

const viewEmployees = () => {
    Employee_db.showEmployeesRolesManagers()
    .then (([data]) => {
        const employees = data;
        // const employees = data.map(employee => employee.first_name + ' ' + employee.last_name)
        // console.log('\n\nThe Employees\n');
        // employees.forEach(employee => console.log(employee));
        console.log('\n')
        console.table(employees)
        console.log('\n')
    })
    .then ( () => {
        promptUser()
    })
}

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
    .then ( (departments) => {
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
    })
    .then(answers => { 
         console.log(answers.roleName, parseInt(answers.salary), parseInt(answers.department))
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
        Employee_db.showEmployees()
        .then (([data]) => {
            if (data) {
                ids.employees = data.map(employee => ({
                    value: employee.id,
                    name: employee.first_name + ' ' + employee.last_name
                }));
                ids.employees.push({
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
        })
        .then(answers => { 
            console.log(answers)
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
        })
        .then(answers => { 
            Employee_db.updateEmployee(parseInt(answers.employee), parseInt(answers.role))
            console.log('\n\nThe employee role is updated \n');
       })
       .then ( () => {
          promptUser()
        })
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
    return prompt(startQuestion)
    .then(answer => { 
        if (`${answer.startQuestion}` === 'View All Departments') {
            viewDepartments()
        } else if (`${answer.startQuestion}` === 'View All Roles') {
            viewRoles()
        } else if (`${answer.startQuestion}` === 'View All Employees') {
            viewEmployees()
        } else if (`${answer.startQuestion}` === 'Add a Department') {
            addDepartment()
        } else if (`${answer.startQuestion}` === 'Add a Role') {
            addRole()
        } else if (`${answer.startQuestion}` === 'Add an Employee') {
            addEmployee()
        } else if (`${answer.startQuestion}` === 'Update an Employee Role') {
            updateEmployeeRole()
        } else if (`${answer.startQuestion}` === 'Delete an Employee') {
            deleteEmployee()
        } else if (`${answer.startQuestion}` === 'Exit Employee Tracker') {
            console.log('\nThank you for using Employee Tracker! Goodbye.\n');
            Employee_db.connection.end();
            return;
        }
    })
};

promptUser()
    .catch(err => {
        console.log(err);
    });





// promptManager()
//     .then(team => {
//         return buildTeam(team);
//     })
//     .then(fullTeam => {
//         return generateHTML(fullTeam);
//     })
//     .then(pageContent => {
//         return writeFile('./dist/index.html', pageContent);
//     })
//     .catch(err => {
//         console.log(err);
//     });/
