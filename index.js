const inquirer = require('inquirer');
const fs = require('fs');

const Employee = require('./tests/employee.test')
const Manager = require('./tests/manager.test');
const Engineer = require('./tests/engineer.test');
const Intern = require('./tests/intern.test');

const employees = [];

// initial prompt to ask the manager of the team and get info

function createManager() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: "What is the team manager's name?",
    },
    {
      type: 'input',
      name: 'id',
      message: "What is the team manager's ID?",
    },
    {
      type: 'input',
      name: 'email',
      message: "What is the team manager's email?",
    },
    {
      type: 'input',
      name: 'officeNumber',
      message: "What is the team manager's office number?",
    },
  ]).then(answers => {
    const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
    employees.push(manager);
    createTeam();
  });
}

// run createManager function to initialize prompts

createManager();


//create the rest of the team, pick whether engineer or intern and enterinfo


function createTeam() {
  inquirer.prompt([
    {
      type: 'list',
      name: 'employeeType',
      message: 'Which type of employee would you like to add?',
      choices: ['Engineer', 'Intern', 'Finish building my team'],
    },
  ]).then(answers => {
    switch (answers.employeeType) {
      case 'Engineer':
        createEngineer();
        break;
      case 'Intern':
        createIntern();
        break;
      default:
        generateHTML();
        break;
    }
  });
}

// create engineer profile with unique github question

function createEngineer() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: "What is the engineer's name?",
    },
    {
      type: 'input',
      name: 'id',
      message: "What is the engineer's ID?",
    },
    {
      type: 'input',
      name: 'email',
      message: "What is the engineer's email?",
    },
    {
      type: 'input',
      name: 'github',
      message: "What is the engineer's GitHub username?",
    },
  ]).then(answers => {
    const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
    employees.push(engineer);
    createTeam();
  });
}

// create intern profile with unique school question

function createIntern() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: "What is the intern's name?",
    },
    {
      type: 'input',
      name: 'id',
      message: "What is the intern's ID?",
    },
    {
      type: 'input',
      name: 'email',
      message: "What is the intern's email?",
    },
    {
      type: 'input',
      name: 'school',
      message: "What is the intern's school?",
    },
  ]).then(answers => {
    const intern = new Intern(answers.name, answers.id, answers.email, answers.school);
    employees.push(intern);
    createTeam();
  });
}

//write the HTML of filled answers to index.html

function generateHTML() {
  let html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>No I in TEEM</title>
        <link rel="stylesheet" href="./style.css">
      </head>
      <body>
        <header>
          <h1>🌭 THE DREEM TEEM 🌭</h1>
        </header>
        <main>
      `;

// for loop that will add infinite employees

  for (let i = 0; i < employees.length; i++) {
    const employee = employees[i];
    const role = employee.getRole();
    let info;

// different info depending on role

    if (role === 'Manager') {
      info = `Office Number: ${employee.officeNumber}`;
    } else if (role === 'Engineer') {
      info = `GitHub: <a href="https://github.com/${employee.github}">${employee.github}</a>`;
    } else if (role === 'Intern') {
      info = `School: ${employee.school}`;
    }

// cards
  
    html += `
        <div class="card">
          <div class="card-header">
            <h2>${employee.name}</h2>
            <h3>${role}</h3>
          </div>
          <div class="card-body">
            <p>ID: ${employee.id}</p>
            <p>Email: <a href="mailto:${employee.email}">${employee.email}</a></p>
            <p>${info}</p>
          </div>
        </div>
      `;
  }

  html += `
        </main>
      </body>
      </html>
    `;

  fs.writeFile('./dist/index.html', html, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log('Team HTML file created!');
    }
  });
}