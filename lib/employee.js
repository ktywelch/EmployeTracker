// Employeee Functions
const inquirer = require("inquirer");
const mysql = require("mysql");
const connection = require('./connection')
const d = require('./department')
const r = require('./role')

module.exports = {
    //This will get a list of all roles used at various times
    getAllEmployees: function (callback) { 
    const sql = 'SELECT e.id as EmployeeID, e.first_name, e.last_name, r.title as Role, \
                 r.salary, d.name as Department, concat(m.first_name, " ", m.last_name) as Manager, m.id as m_id \
                 FROM employee as e left JOIN role as r on e.role_id = r.id \
                 left JOIN department as d ON r.department_id = d.id \
                LEFT JOIN employee as m on e.manager_id = m.id ORDER BY Manager, e.last_name';
       connection.query(sql, function(err, data) {
        if (err) throw err;
        if (data.length > 0) {
         dataArr = JSON.parse(JSON.stringify(data));
         callback(dataArr) 
        } else {
         callback ("no data") ;   
        }
       });
    },

    getAllDeptBudget: function (depts,callback) {  
        const sql = 'SELECT d.name as Department, IF(SUM(r.salary) IS NULL, 0, SUM(r.salary)) AS Total\
        FROM employee as e JOIN role as r on e.role_id = r.id \
        RIGHT join department as d ON r.department_id = d.id \
        WHERE d.id in (?) GROUP BY Department';
           connection.query(sql, [depts], function(err, data) {
            if (err) throw err;
            if (data.length > 0) {
             dataArr = JSON.parse(JSON.stringify(data));
             callback(dataArr) 
            } else {
              callback ("no data");   
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
        const sql = 'UPDATE employee SET first_name = ?, last_name = ?, role_id = ?, manager_id = ? where id = ?';
        connection.query(sql,(empInfo), function(err, data) {
            if (err) throw err;
             let data1 = JSON.parse(JSON.stringify(data));             
             msg = 'Employee updated';
             callback(msg); 
           });
        },
    

    //inquirer lets you add what needs will need to add validation to make sure it is not empty
    inqAddChgEmployee: function (defaults, roles, managers, callback) { 
        let defInf = {'last':'','first':'','role': 0,'man': 0,'ID':''}; 
        let def = defaults[0];
        if (defaults.length > 0) {
          defInf = {'last': def.last_name,'first': def.first_name,'role': def.Role,'man': def.Manager,'ID':def.EmployeeID};
          //This gets the id (used as index) of the role selected in selEmployee 
          if(def.Role){
          let currRoleText = def.Role + "\n\tDepartment: " + def.Department;    
          let currRole = roles.findIndex((object) => {
            return object["name"] === currRoleText})
           //This adds a checkbox so our original department is default 
           roles[currRole].checked = true;
          }
          if(def.Manager){
            let currMan = managers.findIndex((object) => {
                return object["value"] === def.m_id})   
            managers[currMan].checked = true;
          }
        }
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
            type: 'checkbox',
            name: 'role', 
            message: 'Choose Role',
            pageSize: 15,
            choices: roles,
            validate: function(answer) {
                if (answer.length != 1) {
                  return 'You must choose only one';
                }
                return true; 
                }
            },
            {
            type: 'checkbox',
            name: 'manager', 
            message: 'Choose Employee Manager',
            pageSize: 15,
            choices: managers,
            validate: function(answer) {
                if (answer.length != 1) {
                  return 'You must choose only one';
                }
                return true; 
                }
            }
            ])
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
                pageSize: 15,
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