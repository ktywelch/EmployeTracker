// Role Functions
const inquirer = require("inquirer");
const mysql = require("mysql");
const connection = eval(require('./connection'))


module.exports = {
    //This will get a list of all roles used at varioucs times
    getAllRoles: function (callback) {  
    const sql = 'SELECT r.id, r.title, r.salary, d.name as department FROM role as r \
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
    
    //Function del role any departments
    delRole: function (roles, callback) {   
    const sql = 'DELETE FROM role WHERE (id) IN (?)'; 
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

    //inquirer add what needs will need to add validation to make sure it is not empty
    inqAddRole: function (depts,callback) {
        inquirer.prompt([{
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
                }])
        .then((ans) => {           
           let title = ans.title;
           let salary = ans.salary;
           let dept = ans.deptForRole;
           callback([title,salary,dept])
        }) 
        .catch(error => {
            console.log("error", error)
          })
        },
  //function to select role
  selRole: function (currRoles, callback) {
    console.log(typeof(currRoles))
      inquirer.prompt({
          type: 'checkbox',
          name: 'roleSel', 
          message: 'Choose role to remove',
          choices: currRoles
          })
      .then((ans) => {
          callback(ans.roleSel)
      }) 
      .catch(error => {
          console.log("error from inquirer", error)
        })
      }

    }