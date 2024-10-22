"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
const connection_js_1 = require("./connection.js");
function mainMenu() {
    inquirer_1.default.prompt([{
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
        }]).then((response) => __awaiter(this, void 0, void 0, function* () {
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
    })).then(() => {
        mainMenu();
    });
}
;
function viewDepartments() {
    return __awaiter(this, void 0, void 0, function* () {
        const query = 'SELECT * FROM departments';
        const connection = yield connection_js_1.client;
        connection.query(query, (err, res) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log(res.rows);
        });
    });
}
;
function viewRoles() {
    return __awaiter(this, void 0, void 0, function* () {
        const query = 'SELECT * FROM roles';
        const connection = yield connection_js_1.client;
        connection.query(query, (err, res) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log(res.rows);
        });
    });
}
;
function viewEmployees() {
    return __awaiter(this, void 0, void 0, function* () {
        const query = 'SELECT * FROM employees';
        const connection = yield connection_js_1.client;
        connection.query(query, (err, res) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log(res.rows);
        });
    });
}
;
function addDepartment() {
    inquirer_1.default.prompt({
        type: 'input',
        message: 'Enter department name',
        name: 'name'
    }).then((response) => __awaiter(this, void 0, void 0, function* () {
        const query = `INSERT INTO departments (name) VALUES ('${response.name}')`;
        const connection = yield connection_js_1.client;
        connection.query(query, (err, res) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log('Department added successfully.');
        });
    }));
}
;
function addRole() {
    inquirer_1.default.prompt([
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
    ]).then((response) => __awaiter(this, void 0, void 0, function* () {
        const query = `INSERT INTO roles (title, salary, department_id) VALUES ('${response.title}', '${response.salary}', '${response.departmentId}')`;
        const connection = yield connection_js_1.client;
        connection.query(query, (err, res) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log('Role added successfully.');
        });
    }));
}
;
function addEmployee() {
    inquirer_1.default.prompt([
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
    ]).then((response) => __awaiter(this, void 0, void 0, function* () {
        const query = `INSERT INTO employees (first_name, last_name, role_id, manager_id) 
            VALUES ('${response.firstName}', '${response.lastName}', '${response.role}', '${response.manager}')`;
        const connection = yield connection_js_1.client;
        connection.query(query, (err, res) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log('Employee added successfully.');
        });
    }));
}
;
function updateEmployee() {
    inquirer_1.default.prompt([
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
    ]).then((response) => __awaiter(this, void 0, void 0, function* () {
        const query = `UPDATE employees SET role_id = '${response.role}' WHERE id = ${response.id}`;
    }));
}
;
mainMenu();
