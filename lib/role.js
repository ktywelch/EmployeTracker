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
    updRole: function (role, callback) {  
      let msg;
      const sql = 'UPDATE role set title = ?, salary = ?, department_id =? WHERE id = ?';
      connection.query(sql, (role), function(err, data) {
          if (err) throw err;
           let data1 = JSON.parse(JSON.stringify(data));             
           msg = 'Role has been updated';
           callback(msg); 
         });
      },

    //inquirer add what needs will need to add validation to make sure it is not empty
    inqAddRole: function (vals,depts,callback) {
        let roleDef = {'title':'','salary':0,'deptForRole':0,'currRole':0}
        let roleVals = vals[0];
        if(Object.keys(roleVals).length > 0){
          roleDef = {'title':roleVals.title,'salary': roleVals.salary,'deptForRole':roleVals.department,'currRole':roleVals.id}
          console.log('RoleVals',roleVals)
        }
        inquirer.prompt([{
            type: 'input',
            name: 'title', 
            message: 'Enter the Name of Role',
            default: roleDef.title  
            },
            {
            type: 'input',
            name: 'salary', 
            message: 'Enter the Salary for the Role',
            default: roleDef.salary  
            },
            {
            type: 'list',
            name: 'deptForRole', 
            message: 'Choose Department associated with this role',
            default: roleDef.deptForRole, 
            choices: depts
            }])
        .then((ans) => {           
           let title = ans.title;
           let salary = ans.salary;
           let dept = ans.deptForRole;
           callback([title,salary,dept,roleDef.currRole])
        }) 
        .catch(error => {
            console.log("error", error)
          })
        },
  //function to select role
  selRole: function (currRoles, callback) {
      console.log(currRoles);
      inquirer.prompt({
          type: 'checkbox',
          name: 'roleSel', 
          message: 'Select role',
          choices: currRoles
          })
      .then(ans => {
          callback(ans.roleSel)
      }) 
      .catch(error => {
          console.log("error from inquirer", error)
        })
      }

    }