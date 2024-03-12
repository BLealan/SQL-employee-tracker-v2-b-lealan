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
    const query = "SELECT first_name, last_name FROM employee;";
    db.query(query, (err, data) => {
        const employeeList = data.map(
            (item) => `${item.first_name} ${item.last_name}`
        );

        inquirer.prompt([
            {
                name: "employee",
                type: "list",
                message: "Who's role would you like to update?",
                choices: employeeList,
            },
        ])
        .then((answer) => {
            const selectedEmployee = answer.employee.split(" ");
            const firstName = selectedEmployee[0];
            const lastName = selectedEmployee[1];

            const query = "SELECT title FROM role;";
            db.query(query, (err, data) => {
                const roleList = data.map((item) => item.title);
                inquirer.prompt({
                    name: "role",
                    type: "list",
                    message: "What is their new role?",
                    choices: roleList
                })
                .then((answer) => {
                    const query = "SELECT id FROM role WHERE title = ?";
                    db.query(query, [answer.role], (err, data) => {
                        if (err) throw err;
                        const roleId = data[0].id;
                        const query = "UPDATE employee SET role_id = ? WHERE first_name = ? AND last_name = ?";
                        db.query(
                            query, [roleId, firstName, lastName],
                            (err, data) => {
                                if (err) throw err;
                                console.log(`${firstName} ${lastName} updated.`);
                                viewAllEmployees();
                                questionList();
                            }
                        );
                    });
                });
            });
        });
    });
}

// function updateEmployeeRole() {
//     const query = "SELECT first_name, last_name FROM employee";
//     db.query(query, (error, data, fields) => {
//             if (error) {
//                 console.error(error);
//                 return;
//             }
//             const listOfEmployees = data.map(employee => `${employee.first_name} ${employee.last_name}`)

//         inquirer.prompt([
//             {
//                 type: "list",
//                 message: "Who's role is changing?",
//                 name: "employeeToUpdate",
//                 name: "listOfEmployees"
//             },
//             {
//                 type: "input",
//                 message: "What is their new role?",
//                 name: "updatedRole"
//             }
//         ])
//         .then(function(data) {

//             const employeeName = data.employeeToUpdate.split(' ');
//             const firstName = employeeName[0];
//             const lastName = employeeName[1];

//             const query = "UPDATE employee SET role_id = ? WHERE first_name = ? AND last_name = ?";
//             db.query(query, [data.updatedRole, firstName, lastName], function(err, res) {
//                 if (err) throw err;
//                 console.table(res);
//                 questionList();
//             });
//         });
//     });
// };

module.exports = {questionList};