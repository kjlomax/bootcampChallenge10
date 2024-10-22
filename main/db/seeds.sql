
INSERT INTO departments (department_name) 
VALUES 
('Accounting'),
('Human Resources'), 
('Marketing'), 
('Sales');

INSERT INTO roles (title, salary, department_id) 
VALUES
 ('Accountant', 50000, 1),
 ('Accounting Manager', 60000, 1),
 ('HR Associate', 50000, 2),
 ('HR Manager', 60000, 2), 
 ('Marketing Manager', 70000, 3),
 ('Marketing Associate', 50000, 3),
 ('Sales Manager', 80000, 4),
 ('Sales Associate', 50000, 4);




INSERT INTO employees (first_name, last_name, role_id, manager_id) 
VALUES 
('Andy', 'Andrews', 2, null),
('Alice', 'Anderson', 1, 1),
('Bob', 'Baker', 4, null),
('Beth', 'Barker', 3, 3),
('Charlie', 'Chaplin', 5, null),
('Cathy', 'Carter', 6, 5),
('David', 'Davids', 7, null),
('Diane', 'Davids', 8, 7);


