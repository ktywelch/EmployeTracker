SELECT e.first_name, e.last_name, e.role_id, r.title, r.salary, d.name as department,  
m.last_name as Manager_Last, m.first_name as Manager_First    
FROM employee as e INNER JOIN  role as r on e.role_id = r.id
INNER JOIN department as d ON r.department_id = d.id
JOIN employee as m on e.manager_id = m.id 
ORDER BY d.name;


