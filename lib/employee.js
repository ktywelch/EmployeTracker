// Employeee Functions
const inquirer = require("inquirer");
const mysql = require("mysql");
const connection = eval(require('./connection'))
const d = require('./department')
const r = require('./role')

module.exports = {
    //This will get a list of all roles used at various times
    getAllEmployees: function (callback) {  
    const sql = 'SELECT e.id as EmployeeID, e.first_name, e.last_name, r.title as Role, \
                 r.salary, d.name as Department, concat(m.first_name, " ", m.last_name) as Manager \
                 FROM employee as e INNER JOIN role as r on e.role_id = r.id \
                 INNER JOIN department as d ON r.department_id = d.id \
                LEFT JOIN employee as m on e.manager_id = m.id ORDER BY d.name';
       connection.query(sql, function(err, data) {
        if (err) throw err;
        if (data.length > 0) {
         dataArr = JSON.parse(JSON.stringify(data));
         callback(dataArr) 
        } else {
         return false;   
        }
       });
    },

    getManagers: function (callback) {
        const sql = 'SELECT id, concat(first_name, last_name) as Manager from employee\
        where role = "Manager"'; 
        connection.query(sql, function (err, data) {
            if (err) throw err;
            if (data.length > 0) {
            dataArr = JSON.parse(JSON.stringify(data));
            callback(dataArr) 
           } else {
            return false;   
           }
          });
       },
    
    delEmployee: function (roles, callback) {   
    const sql = 'DELETE FROM employees WHERE (id) IN (?)'; 
    connection.query(sql, [roles], function (err, data) {
        if (err) throw err;
        let data1 = JSON.parse(JSON.stringify(data));
         callback ('roles deleted');
        })
    },
    //SQL to add - we made the name as unique in the DB so we should add error handling for that
    addEmployee: function (empInfo, callback) {  
    let msg;
    const sql = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ?';
    connection.query(sql, [empInfo], function(err, data) {
        if (err) throw err;
         let data1 = JSON.parse(JSON.stringify(data));             
         msg = `Record ID ${data1.insertId} Employee ${empInfo} added`;
         callback(msg); 
       });
    },
    //inquirer lets you add what needs will need to add validation to make sure it is not empty
    inqRole: function (roles, managers, callback) {
        console.log(depts);
        inquirer.prompt([{
            type: 'input',
            name: 'firstName', 
            message: 'Enter Employee First Name'  
            },
            {
            type: 'input',
            name: 'LastName', 
            message: 'Enter Employee Last Name'  
            },
            {
            type: 'list',
            name: 'roleName', 
            message: 'Choose Department associated with this role',
            choices: roles
            },
            {
            type: 'list',
            name: 'roleName', 
            message: 'Choose Employee Manager',
            choices: managers
            }])
        .then((ans) => {
           let dept;
           //go through find the id for the value
           depts.forEach(e => {
             if (e.name === ans.deptForRole){
               dept = e.id
             }       
           });
           
           let title = ans.title;
           let salary = ans.salary;
           //let dept = ans.depts;
           callback([title,salary,dept])
        }) 
        .catch(error => {
            console.log("error", error)
          })
        },
        //function to show a list of departs to select from
        selRole: function (roles, callback) {
            let delD;
            inquirer.prompt({
                type: 'checkbox',
                name: 'roleToDel', 
                message: 'Choose role to remove',
                choices: roles
                })
            .then((ans) => {
               delD =  ans.roleToDel
               callback(delD)
            }) 
            .catch(error => {
                console.log("error from inquirer", error)
              })
            }

    }