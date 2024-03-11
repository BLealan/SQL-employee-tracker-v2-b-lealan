const inquirer = require('inquirer');
const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Primer-04',
        database: 'employee_db'
    },
    console.log('====== Connected to employee_db. ======')
);

function questionList() {
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            name: "choice",
            choices: [
                "View all departments",
                "View all roles",
                "View all employees",
                "Add a department",
                "Add a role",
                "Add an employee",
                "Update employee role",
                "EXIT"
            ]
        }
    ])
    .then((data) => {
        switch (data.choice) {
            case "View all departments":
                viewAllDepartments();
                break;
            case "View all roles":
                viewAllRoles();
                break;
            case "View all employees":
                viewAllEmployees();
                break;
            case "Add a department":
                addDepartment();
                break;
            case "Add a role":
                addRole();
                break;
            case "Add an employee":
                addEmployee();
                break;
            case "Update employee role":
                updateEmployeeRole();
                break;
            default:
            case "EXIT":
                process.exit();
        }
    });
};

function viewAllDepartments() {
    const input = 'SELECT * FROM department';
    db.query(input, function(err, res) {
        if (err) throw err;
        console.table(res);
        questionList();
    });
};

function viewAllRoles() {
    const input = 'SELECT * FROM role';
    db.query(input, function(err, res) {
        if (err) throw err;
        console.table(res);
        questionList();
    });
};

function viewAllEmployees() {
    const input = 'SELECT * FROM employee';
    db.query(input, function(err, res) {
        if (err) throw err;
        console.table(res);
        questionList();
    });
};
function addDepartment() {

    inquirer.prompt({
        type: "input",
        message: "Which department would you like to add?",
        name: "newDepartment"
    })
    .then(function(data){
        db.query("INSERT INTO department (department_name) VALUES (?)", [data.newDepartment], function(err, res){
            if (err) throw err;
            console.table(res);
            questionList();
        })
    });
};

function addRole() {
    inquirer.prompt([
        {
            type: "input",
            message: "Which role would you like to add?",
            name: "newRole"
        },
        {
            type: "input",
            message: "What is their salary?",
            name: "newSalary"
        },
        {
            type: "input",
            message: "Which department do they belong to? (provide department ID)",
            name: "newDepartmentID"
        }
    ])
    .then(function(data){
        db.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [data.newRole, data.newSalary, data.newDepartmentID], function(err, res){
            if (err) throw err;
            console.table(res);
            questionList();
        })
    });
};
function addEmployee() {
    inquirer.prompt([
        {
            type: "input",
            message: "Enter their last name",
            name: "newLastName"
        },
        {
            type: "input",
            message: "What is first name?",
            name: "newFirstName"
        },
        {
            type: "input",
            message: "What is their role? (provide role ID)",
            name: "newRoleID"
        }
    ])
    .then(function(data){
        db.query("INSERT INTO employee (first_name, last_name, role_id) VALUES (?, ?, ?)", [data.newFirstName, data.newLastName, data.newRoleID], function(err, res){
            if (err) throw err;
            console.table(res);
            questionList();
        })
    });
};
function updateEmployeeRole() {
    inquirer.prompt([
        {
            type: "input",
            message: "Who's role is changing? (provide last name)",
            name: employeeToUpdate
        },
        {
            type: "input",
            message: "What is their new role?",
            name: "updatedRole"
        }
    ])
    .then(function(data) {
        db.query('UPDATE employee SET ')
    })
};

module.exports = {questionList};