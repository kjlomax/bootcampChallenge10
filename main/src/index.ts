


import inquirer from 'inquirer';
import { pool, connectToDb, client } from './connection.js';

    function mainMenu(): void {
        inquirer.prompt([{
            type: 'list',
            message: 'What would you like to do?',
            name: 'choice',
            choices: [
                {
                    name: 'View all departments',
                    value: 'viewDepartments'
                },
                {
                    name: 'View all roles',
                    value: 'viewRoles'
                },
                {
                    name: 'View all employees',
                    value: 'viewEmployees'
                },
                {
                    name: 'Add a department',
                    value: 'addDepartment'
                },
                {
                    name: 'Add a role',
                    value: 'addRole'
                },
                {
                    name: 'Add an employee',
                    value: 'addEmployee'
                },
                {
                    name: 'Update an employee role',
                    value: 'updateEmployeeRole'
                },
                {
                    name: 'Quit',
                    value: 'quit'
                }
                
                
            ]
        }]).then(async (response) => {
            if (response.choice === 'viewDepartments') {
                viewDepartments();
                mainMenu();
            }
            else if (response.choice === 'viewRoles') {
                viewRoles();
            }
            else if (response.choice === 'viewEmployees') {
                viewEmployees();
            }
            else if (response.choice === 'addDepartment') {
                addDepartment();
            }
            else if (response.choice === 'addRole') {
                addRole();
            }
            else if (response.choice === 'addEmployee') {
                addEmployee();
            }
            else if (response.choice === 'updateEmployee') {
                updateEmployee();
            }
            else if (response.choice === 'quit') {
                process.exit();
            }
            
            
        }).then(() => {
            mainMenu();
        })
    };



    async function viewDepartments(): Promise<void> {
        const query = 'SELECT * FROM departments';
        const connection = await client;
        connection.query(query, (err, res) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log(res.rows);
        })
        
    };
    async function viewRoles(): Promise<void> {
        const query = 'SELECT * FROM roles';
        const connection = await client;
        connection.query(query, (err, res) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log(res.rows);
        })
    };
    async function viewEmployees(): Promise<void> {
        const query = 'SELECT * FROM employees';
        const connection = await client;
        connection.query(query, (err, res) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log(res.rows);
        })
    };
    function addDepartment(): void {
        inquirer.prompt({
            type: 'input',
            message: 'Enter department name',
            name: 'name'
        }).then(async (response) => {
            const query = `INSERT INTO departments (name) VALUES ('${response.name}')`;
            const connection = await client;
            connection.query(query, (err, res) => {
                if (err) {
                    console.error(err);
                    return;
                }
                console.log('Department added successfully.');
            })
        })
    };
    function addRole(): void {
        inquirer.prompt([
            {
            type: 'input',
            name: 'title',
            message: 'Enter role title'
            },
            {
                type: 'input',
                name: 'salary',
                message: 'Enter role salary'
            },
            {
                type: 'input',
                name: 'departmentId',
                message: 'Enter department ID'
            }
    ]).then(async (response) => {
        const query = `INSERT INTO roles (title, salary, department_id) VALUES ('${response.title}', '${response.salary}', '${response.departmentId}')`;
        const connection = await client;
        connection.query(query, (err, res) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log('Role added successfully.');
        })
    })
    };
     function addEmployee(): void {
        inquirer.prompt([
            {
                type: 'input',
                message: 'Enter employee first name',
                name: 'firstName'
            },
            {
                type: 'input',
                message: 'Enter employee last name',
                name: 'lastName'
            },
            {
                type: 'input',
                message: 'Enter employee role',
                name: 'role'
            },
            {
                type: 'input',
                message: 'Enter employee manager',
                name: 'manager'
            }
        ]).then(async (response) => {
            const query = `INSERT INTO employees (first_name, last_name, role_id, manager_id) 
            VALUES ('${response.firstName}', '${response.lastName}', '${response.role}', '${response.manager}')`;
            const connection = await client;
             connection.query(query, (err, res) => {
                if (err) {
                    console.error(err);
                    return;
                }
                console.log('Employee added successfully.');
        })
        
})
    };
    function updateEmployee(): void {
        inquirer.prompt([
            {
                type: 'input',
                message: 'Enter employee ID',
                name: 'id'
            },
            {
                type: 'input',
                message: 'Enter new role title',
                name: 'role'
            }
        ]).then(async (response) => {
            const query = `UPDATE employees SET role_id = '${response.role}' WHERE id = ${response.id}`;
        })

    };

    mainMenu();

