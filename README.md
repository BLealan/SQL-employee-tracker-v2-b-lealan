# SQL Employee Tracker

## Description

This task was to create a "content management system" in order for users to view information stored in an associated database. This is to be accessed via the command line.

The files in the "db" folder contain the files that will set up the database and their associated tables, along with some example data to populate it. The "questions.js" establishes a connection to this database, and prompts the user with questions in their terminal. Depending on their selection, this will trigger certain functions which will display or alter data accordingly. 

## Usage

Ensure you hae cloned repository from GitHub and are working in the integrated terminal from it's root folder.
- Enter `mysql -u root -p` and type in your SQL password when prompted.
- Enter `SOURCE db/schema.sql;` in order to create the database that the user will be interacting with.
- If you wish to populate the database with some examples in order to visualise the database, now run `SOURCE db/seeds.sql;`.
- Use `\q` to exit the SQL shell.
- Now you can run `node index.js` and follow the prompts to view and alter the databases.

## Installation

Please run `npm install` to ensure that ['inquirer'](https://www.npmjs.com/package/inquirer) and ['mysql'](https://www.mysql.com/) will work when running the programme. Then you will be able to run `node index.js`

## Demonstration

A video on using this application can be found [here](https://drive.google.com/file/d/1k3_BPjbnfU8s2wtLOPPkudSLiAu4k7E7/view?usp=sharing).

## Sources
- https://stackoverflow.com/questions/56412516/conditional-prompt-rendering-in-inquirer
- https://www.npmjs.com/package/inquirer#question
- https://stackoverflow.com/questions/16631064/declare-multiple-module-exports-in-node-js
- https://stackoverflow.com/questions/68170024/keep-repeating-the-prompter-questions-with-inquirer-js-based-on-answer
