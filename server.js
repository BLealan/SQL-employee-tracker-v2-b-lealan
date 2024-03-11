//Import dependencies used in code
const inquirer = require('inquirer');
const express = require('express');
const mysql = require('mysql2');

//Declare local server to listen for
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Primer-04',
        database: 'employee_db'
    },
    console.log('====== Connected to employee_db. ======')
);

db.query('SELECT * FROM employee', function (err, results) {
    console.log(results);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});