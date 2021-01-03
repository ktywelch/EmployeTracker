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
                LEFT JOIN employee as m on e.manager_id = m.id ORDER BY Manager, e.last_name';
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
        const sql = 'SELECT e.id, concat(e.first_name," ", e.last_name) as manager, r.title, d.name as department \
        FROM employee as e INNER JOIN role as r on e.role_id = r.id \
        INNER JOIN department as d ON r.department_id = d.id \
        WHERE lower(r.title) = "manager"';
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
    
    delEmployee: function (emp, callback) {   
    const sql = 'DELETE FROM employee WHERE (id) IN (?)'; 
    connection.query(sql, [emp], function (err, data) {
        if (err) throw err;
        let data1 = JSON.parse(JSON.stringify(data));
         callback ('Employee deleted');
        })
    },
    //SQL to add - we made the name as unique in the DB so we should add error handling for that
    addEmployee: function (empInfo, callback) {  
    let msg;
    const sql = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?)';
    connection.query(sql, [empInfo], function(err, data) {
        if (err) throw err;
         let data1 = JSON.parse(JSON.stringify(data));             
         msg = `Record ID ${data1.insertId} Employee ${empInfo} added`;
         callback(msg); 
       });
    },

    updEmployee: function (empInfo, callback) {  
        let msg;
        console.log(empInfo);
        const sql = 'UPDATE employee SET first_name = ?, last_name = ?, role_id = ?, manager_id = ? where id = ?';
        connection.query(sql,(empInfo), function(err, data) {
            if (err) throw err;
             let data1 = JSON.parse(JSON.stringify(data));             
             msg = 'Employee updated';
             callback(msg); 
           });
        },
    

    //inquirer lets you add what needs will need to add validation to make sure it is not empty
    inqAddEmployee: function (defaults, roles, managers, callback) { 
        let defInf = {'last':'','first':'','role': 0,'man': 0,'ID':''}; 
        let def = defaults[0];
        if (defaults.length > 0) {
          //console.log("where to get employee from",defaults);
          defInf = {'last': def.last_name,'first': def.first_name,'role': def.Role,'man': def.Manager,'ID':def.EmployeeID};
        }
        console.log(defInf)
        inquirer.prompt([{
            type: 'input',
            name: 'firstName', 
            message: 'Enter Employee First Name',  
            default: defInf.first 
            },
            {
            type: 'input',
            name: 'lastName', 
            message: 'Enter Employee Last Name' , 
            default: defInf.last
            },
            {
            type: 'list',
            name: 'role', 
            message: 'Choose Role',
            default: defInf.role,
            choices: roles
            },
            {
            type: 'list',
            name: 'manager', 
            message: 'Choose Employee Manager',
            default: defInf.man,
            choices: managers
            }])
        .then((ans) => {
           callback([ans.firstName,ans.lastName,ans.role,ans.manager,defInf.ID])
        }) 
        .catch(error => {
            console.log("error", error)
          })
        },
     
        //function to show a list of departs to select from
        selEmployee: function (employees, callback) {
            inquirer.prompt({
                type: 'checkbox',
                name: 'empSel', 
                message: 'Choose employee',
                choices: employees,
                validate: function(answer) {
                    if (answer.length != 1) {
                      return 'You must choose only one';
                    }
                    return true; 
                    }
                })
            .then(ans => {
               callback(ans.empSel)
            }) 
            .catch(error => {
                console.log("error from inquirer", error)
              })
            }

    }