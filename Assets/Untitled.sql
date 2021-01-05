 SELECT e.id as EmployeeID, e.first_name, e.last_name, r.title as Role, 
                 r.salary, d.name as Department, concat(m.first_name, " ", m.last_name) as Manager 
                 FROM employee as e JOIN role as r on e.role_id = r.id 
                 JOIN department as d ON r.department_id = d.id 
                LEFT JOIN employee as m on e.manager_id = m.id ORDER BY Manager, e.last_name