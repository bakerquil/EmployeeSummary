const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");


let employees = [];

function addMember() {
  inquirer
    .prompt([
      {
        message: "Enter member's name",
        name: "name",
      },
      {
        type: "list",
        message: "What is the team member's role?",
        choices: ["Engineer", "Intern", "Manager"],
        name: "role",
      },
      {
        message: "What is the team member's id?",
        name: "id",
      },
      {
        message: "Enter email address",
        name: "email",
      },
    ])
    .then(function ({ name, role, id, email }) {
      let roleInfo = "";
      if (role == "Engineer") {
        roleInfo = "Github username";
      } else if (role == "Intern") {
        roleInfo = "school's name";
      } else {
        roleInfo = "office phone #";
      }
      inquirer
        .prompt([
          {
            message: `Team member's ${roleInfo}`,
            name: "roleInfo",
          },
          {
            type: "list",
            message: "Would you like to add more team member?",
            choices: ["yes", "no"],
            name: "moreMembers",
          },
        ])
        .then(function ({ roleInfo, moreMembers }) {
          let newMember;
          if (role === "Engineer") {
            newMember = new Engineer(name, id, email, roleInfo);
          } else if (role === "Intern") {
            newMember = new Intern(name, id, email, roleInfo);
          } else {
            newMember = new Manager(name, id, email, roleInfo);
          }
          employees.push(newMember);
          addHtml(newMember).then(function () {
            if (moreMembers === "yes") {
              addMember();
            } else {
              finishHtml();
            }
          });
        });
    });
}

function initApp() {
  startHtml();
  addMember();
}

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
/*function startHtml() {
    const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <title>Team Profile</title>
    </head>
    <body>
        <nav class="navbar navbar-dark bg-dark mb-5">
            <span class="navbar-brand mb-0 h1 w-100 text-center">Team Profile</span>
        </nav>
        <div class="container">
            <div class="row">`;
    fs.writeFile("./output/team.html", html, function(err) {
        if (err) {
            console.log(err);
        }
    });
}*/

function startHtml() {
  const html = `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>My Team</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" href="style.css">
    <script src="https://kit.fontawesome.com/c502137733.js"></script>
</head>

<body>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12 jumbotron mb-3 team-heading">
                <h1 class="text-center">My Team</h1>
            </div>
        </div>
    </div>
    <div class="container">
        <div class="row">
            <div class="team-area col-12 d-flex justify-content-center">
                
            </div>
        </div>
    </div>
</body>

</html>
`;
  fs.writeFile("../test.html", html, function (err) {
    if (err) {
      console.log(err);
    }
  });
  console.log("start");
}

function addHtml(member) {
  return new Promise(function (resolve, reject) {
    const name = member.getName();
    const role = member.getRole();
    const id = member.getId();
    const email = member.getEmail();
    let data = "";
    if (role === "Engineer") {
      const gitHub = member.getGithub();
      data = `<div class="card employee-card">
        <div class="card-header">
            <h2 class="card-title">${name}</h2>
            <h3 class="card-title"><i class="fas fa-glasses mr-2"></i>${role}</h3>
        </div>
        <div class="card-body">
            <ul class="list-group">
                <li class="list-group-item">ID: ${ id }</li>
                <li class="list-group-item">Email: <a href="mailto:${email}">${email}</a></li>
                <li class="list-group-item">GitHub: <a href="https://github.com/${gitHub}" target="_blank" rel="noopener noreferrer">${ gitHub}</a></li>
            </ul>
        </div>
    </div>
    `
    } else if (role === "Intern") {
      const school = member.getSchool();
      data = `<div class="card employee-card">
      <div class="card-header">
          <h2 class="card-title">${name}</h2>
          <h3 class="card-title"><i class="fas fa-user-graduate mr-2"></i>${role}</h3>
      </div>
      <div class="card-body">
          <ul class="list-group">
              <li class="list-group-item">ID: ${id}</li>
              <li class="list-group-item">Email: <a href="mailto:${email}">l }${email}</a></li>
              <li class="list-group-item">School: ${school}</li>
          </ul>
      </div>
  </div>
  `;
    } else {
      const officeNumber = member.getOfficeNumber();
      data =` <div class="card employee-card">
      <div class="card-header">
          <h2 class="card-title">${name}</h2>
          <h3 class="card-title"><i class="fas fa-mug-hot mr-2"></i>${role}</h3>
      </div>
      <div class="card-body">
          <ul class="list-group">
              <li class="list-group-item">ID: ${id}</li>
              <li class="list-group-item">Email: <a href="mailto:${email}">${ email }</a></li>
              <li class="list-group-item">Office number: ${officeNumber}</li>
          </ul>
      </div>
  </div>
  `;
    }
    console.log("adding team member");
    fs.appendFile("../test.html", data, function (err) {
      if (err) {
        return reject(err);
      }
      return resolve();
    });
  });
}

function finishHtml() {
  const html = ` </div>
    </div>
    
</body>
</html>`;

  fs.appendFile("../test.html", html, function (err) {
    if (err) {
      console.log(err);
    }
  });
  console.log("end");
}

initApp();
