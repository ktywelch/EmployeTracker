//Department Functions
const inquirer = require("inquirer");
const util = require("util");
const fs = require("fs");
const mysql = require("mysql");
const scripts = require('./sqlscripts');
const connection = eval(require('./connection'))

/*
scripts["sel_dept"] = 'SELECT id FROM department where id ?';
scripts["list_dept"] = 'SELECT * FROM department'
scripts["dept_budget"] = 'SELECT  e.* from employee INNER JOIN  last_name, role_id, manager_id, salary, sum(salary) as totals from \
employees  GROUP BY department_id';
scripts["del_dept"] = 'DELETE FROM department WHERE (id) in ?';

const connection = eval(scripts.connection);
let dataArr = []
const qconn = util.promisify(connection.query).bind(connection);
*/

module.exports = {
    //This will get a list of all departments used at various times
    getAllDept: function (callback) {  
    const sql = 'SELECT * FROM department';
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
    //Function to delete any departments
    delDept: function (depts, callback) {   
    const sql = 'DELETE FROM department WHERE (name) IN (?)'; 
    connection.query(sql, [depts], function (err, data) {
        if (err) throw err;
        let data1 = JSON.parse(JSON.stringify(data));
         callback ('departments deleted');
        })
    },
    //SQL to add - we made the name as unique in the DB so we should add error handling for that
    addDept: function (dept, callback) {  
    let msg;
    const sql = 'INSERT INTO department (name) VALUES (?)';
    connection.query(sql, [dept], function(err, data) {
        if (err) throw err;
         let data1 = JSON.parse(JSON.stringify(data));             
         msg = `Record ID ${data1.insertId} Department Name ${dept} added`;
         callback(msg); 
       });
    },
    //inquirer lets you add what needs will need to add validation to make sure it is not empty
    inqDept: function (callback) {
        inquirer.prompt({
            type: 'input',
            name: 'deptName', 
            message: 'Enter the Name of Department to add'
        
            })
        .then(({deptName}) => {
           return callback(deptName)
        }) 
        .catch(error => {
            console.log("error", error)
          })
        },
        //function to show a list of departs to select from
        selDept: function (depts, callback) {
            let delD;
            inquirer.prompt({
                type: 'checkbox',
                name: 'deptToDel', 
                message: 'Choose Department to remove',
                choices: depts
                })
            .then((ans) => {
               delD =  ans.deptToDel
               callback(delD)
            }) 
            .catch(error => {
                console.log("error from inquirer", error)
              })
            }

    }
