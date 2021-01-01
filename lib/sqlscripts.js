let scripts ={};
scripts["add_role"] = 'INSERT INTO role title, salary, dept VALUES ?';
scripts["sel_roles"] = 'SELECT * FROM roles where ?';
scripts["list_roles"] = 'SELECT r.title, r.salary, d.name as department \
        FROM roles as r LEFT JOIN department as d ON r.department_id = d.id';
scripts["del_role"] = 'DELETE FROM role WHERE id ?';

scripts["add_employee"] = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ?';
scripts["sel_employees"] = 'SELECT * FROM employees';
scripts["update_employee_manager"] = 'UPDATE employees SET manager  ? where id = ?';
scripts["update_employee_role"] = 'UPDATE employees SET role ? where id  ?';
scripts["sel_employee_by_mgr"] = 'SELECT * FROM employess group by manager_id';
scripts["del_emp"] = 'DELETE FROM employee WHERE id ?';



scripts["employee_all_detail"] = 'SELECT e.first_name, e.last_name, e.role_id, r.title, r.salary, d.name as department, concat(m.first_name, " ", m.last_name) as Manager \
FROM employee as e INNER JOIN role as r on e.role_id = r.id \
INNER JOIN department as d ON r.department_id = d.id \
LEFT JOIN employee as m on e.manager_id = m.id ORDER BY d.name';

scripts["connection"] = "mysql.createConnection({ \
    connectionLimit : 10, \
    host: 'localhost',  \
    port: 3306,   \
    user: 'root', \
    password: 'password', \
    database: 'company'})"

module.exports = scripts; 