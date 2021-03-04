const connection = require('./db/connection');
const employee_db = require('./db/');
const inquirer = require('inquirer');

let Employee_db = new employee_db(connection);

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
        choices: ['Sales',
            'Engineering',
            'Finance',
            'Legal']
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
        choices: ['Sales Lead',
            'Sales Person',
            'Lead Engineer',
            'Software Engineer',
            'Accountant',
            'Legal Team Lead',
            'Lawyer']
    }
];

const addDepartment = () => {
    return inquirer.prompt(addDepartmentQuestion)
    .then(answer => { 
        employee_db.showDepartments();
        console.log("in addDepartment", answer)
        promptUser()
        return; // will need to actually return new department array

        // if (`${answer.id}` === "???") {
        //     return inquirer.prompt(engineerQuestions)
        //     //promptEngineer()
        //         .then(EngineerAnswers => {
        //             team.push(new Engineer(`${EngineerAnswers.employeeName}`, `${EngineerAnswers.id}`, `${EngineerAnswers.email}`, `${EngineerAnswers.github}`));
        //             return buildTeam(team)
        //         })
    })
};

const addEmployee = () => {
    return inquirer.prompt(addEmployeeQuestions)
    .then(answer => { 
        console.log("in addEmployees", answer)
        promptUser()
        return; // will need to actually return new employees array

        // if (`${answer.id}` === "???") {
        //     return inquirer.prompt(engineerQuestions)
        //     //promptEngineer()
        //         .then(EngineerAnswers => {
        //             team.push(new Engineer(`${EngineerAnswers.employeeName}`, `${EngineerAnswers.id}`, `${EngineerAnswers.email}`, `${EngineerAnswers.github}`));
        //             return buildTeam(team)
        //         })
    })
};

const addRole = () => {
    return inquirer.prompt(addRoleQuestions)
    .then(answer => { 
        console.log("in addRole", answer)
        promptUser()
        return; // will need to actually return new roles array
        // change the role_id on the employee provided by employee id???

        // if (`${answer.id}` === "???") {
        //     return inquirer.prompt(engineerQuestions)
        //     //promptEngineer()
        //         .then(EngineerAnswers => {
        //             team.push(new Engineer(`${EngineerAnswers.employeeName}`, `${EngineerAnswers.id}`, `${EngineerAnswers.email}`, `${EngineerAnswers.github}`));
        //             return buildTeam(team)
        //         })
    })
};


const updateEmployeeRole = () => {
    return inquirer.prompt(updateEmployeeRoleQuestions)
    .then(answer => { 
        console.log("in updateEmployeeRole", answer)
        promptUser()
        return; // will need to actually return updated employee info
        // change the role_id on the employee provided by employee id???

        // if (`${answer.id}` === "???") {
        //     return inquirer.prompt(engineerQuestions)
        //     //promptEngineer()
        //         .then(EngineerAnswers => {
        //             team.push(new Engineer(`${EngineerAnswers.employeeName}`, `${EngineerAnswers.id}`, `${EngineerAnswers.email}`, `${EngineerAnswers.github}`));
        //             return buildTeam(team)
        //         })
        
    })
};


const promptUser = () => {
    return inquirer.prompt(startQuestion)
    .then(answer => { 
        if (`${answer.startQuestion}` === "View All Departments") {
            Employee_db.showDepartments()
            promptUser()
        } else if (`${answer.startQuestion}` === "View All Roles") {
            console.log("will view all Roles here");
            promptUser()
        } else if (`${answer.startQuestion}` === "View All Employees") {
            console.log("will view all Employees here");
            promptUser()
        } else if (`${answer.startQuestion}` === "Add a Department") {
            console.log("will add a Department here");
            addDepartment()
        } else if (`${answer.startQuestion}` === "Add a Role") {
            console.log("will add a Role here");
            addRole()
        } else if (`${answer.startQuestion}` === "Add an Employee") {
            console.log("will add an Employee here");
            addEmployee()
        } else if (`${answer.startQuestion}` === "Update an Employee Role") {
            console.log("will updata an Employee Role here");
            updateEmployeeRole()
        } else if (`${answer.startQuestion}` === "Exit Employee Tracker") {
            console.log("Thank you for using Employee Tracker! Goodbye.");
            return;
        }
    })
};

promptUser()
    .catch(err => {
        console.log(err);
    });


// const writeFile = (fileName, fileContent) => {
//     return new Promise((resolve, reject) => {
//       fs.writeFile(fileName, fileContent, err => {
//         // if there's an error, reject the Promise and send the error to the Promise's `.catch()` method
//         if (err) {
//           reject(err);
//           // return out of the function here to make sure the Promise doesn't accidentally execute the resolve() function as well
//           return;
//         }
  
//         // if everything went well, resolve the Promise and send the successful data to the `.then()` method
//         resolve({
//           ok: true,
//           message: 'Open index.html in your browser to see employee files!'
//         });
//       });
//     });
// };



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
