INSERT INTO department (department_name)
VALUES  ("IT"),
        ("Accounting"),
        ("Management"),
        ("Human Resources");

INSERT INTO role (title, salary, department_id)
VALUES  ("Line Manager", 35000, 3),
        ("CEO", 120000, 3),
        ("Accountant", 30000, 2),
        ("Cyber Security Expert", 28000, 1);

INSERT INTO employee (first_name, last_name, role_id)
VALUES  ("Aaron", "Aaronson", 4),
        ("Zach", "Zukowski", 1);