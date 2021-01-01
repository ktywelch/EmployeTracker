// Role Functions
const inquirer = require("inquirer");
const mysql = require("mysql");
const connection = eval(require('./connection'))
const d = require('./department')


module.exports = {
    //This will get a list of all roles used at various times
    getAllRoles: function (callback) {  
    const sql = 'SELECT r.title, r.salary, d.name as department FROM roles as r \
                 LEFT JOIN department as d ON r.department_id = d.id';
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
    //Function to role any departments
    delRole: function (roles, callback) {   
    const sql = 'DELETE FROM role WHERE (name) IN (?)'; 
    connection.query(sql, [roles], function (err, data) {
        if (err) throw err;
        let data1 = JSON.parse(JSON.stringify(data));
         callback ('roles deleted');
        })
    },
    //SQL to add - we made the name as unique in the DB so we should add error handling for that
    addRole: function (role, callback) {  
    let msg;
    const sql = 'INSERT INTO role (title, salary, department_id) VALUES (?)';
    connection.query(sql, [role], function(err, data) {
        if (err) throw err;
         let data1 = JSON.parse(JSON.stringify(data));             
         msg = `Record ID ${data1.insertId} Role of ${role} added`;
         callback(msg); 
       });
    },
    //inquirer lets you add what needs will need to add validation to make sure it is not empty
    inqRole: function (callback) {
       let depts;
       d.selDept(data, res => {
        depts = res})
        inquirer.prompt({
            type: 'input',
            name: 'title', 
            message: 'Enter the Name of Role to add'  
            },
            {
              type: 'input',
              name: 'salary', 
              message: 'Enter the Salary for the Role'
              },
              {
                type: 'list',
                name: 'deptForRole', 
                message: 'Choose Department associated with this role',
                choices: depts
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