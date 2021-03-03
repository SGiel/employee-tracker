const fs = require('fs');
const inquirer = require('inquirer');

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
                console.log("Invalid entry. Please enter a number with no commas, $ or other characters.");
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

const employeeQuestions = [
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

const promptUser = () => {
    return inquirer.prompt(startQuestion)
    .then(answer => { 
        if (`${answer.startQuestion}` === "View All Departments") {
            console.log("will view all Departments here");
            return promptUser()
        } else if (`${answer.startQuestion}` === "View All Roles") {
            console.log("will view all Roles here");
            return promptUser()
        } else if (`${answer.startQuestion}` === "View All Employees") {
            console.log("will view all Employees here");
            return promptUser()
        } else if (`${answer.startQuestion}` === "Add a Department") {
            console.log("will add a Department here");
            return promptUser()
        } else if (`${answer.startQuestion}` === "Add a Role") {
            console.log("will add a Role here");
            return promptUser()
        } else if (`${answer.startQuestion}` === "Add an Employee") {
            console.log("will add an Employee here");
            return promptUser()
        } else if (`${answer.startQuestion}` === "Update an Employee Role") {
            console.log("will add an Employee Role here");
            return promptUser()
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

//         if (`${answer.teamMember}` === "View All Departments") {
//             return inquirer.prompt(startQuestion)
//         } else if (`${answer.teamMember}` === "Intern") {
//             return inquirer.prompt(internQuestions)
//             //promptIntern()
//                 .then(InternAnswers => {
//                     team.push(new Intern(`${InternAnswers.employeeName}`, `${InternAnswers.id}`, `${InternAnswers.email}`, `${InternAnswers.school}`));
//                     return buildTeam(team)
//                 })
//         } else return team;
//     })
// };


// choices: ['View All Departments',
// 'View All Roles',
// 'View All Employees',
// 'Add a Department',
// 'Add a Role',
// 'Add an Employee',
// 'Update an Employee Role',
// 'Exit Employee Tracker']


// const trackEmployee = (team) => {
//     return inquirer.prompt(buildTeamQuestion)
//     //promptBuildTeam()
//     .then(answer => { 
//         if (`${answer.teamMember}` === "Engineer") {
//             return inquirer.prompt(engineerQuestions)
//             //promptEngineer()
//                 .then(EngineerAnswers => {
//                     team.push(new Engineer(`${EngineerAnswers.employeeName}`, `${EngineerAnswers.id}`, `${EngineerAnswers.email}`, `${EngineerAnswers.github}`));
//                     return buildTeam(team)
//                 })
//         } else if (`${answer.teamMember}` === "Intern") {
//             return inquirer.prompt(internQuestions)
//             //promptIntern()
//                 .then(InternAnswers => {
//                     team.push(new Intern(`${InternAnswers.employeeName}`, `${InternAnswers.id}`, `${InternAnswers.email}`, `${InternAnswers.school}`));
//                     return buildTeam(team)
//                 })
//         } else return team;
//     })
// };

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
