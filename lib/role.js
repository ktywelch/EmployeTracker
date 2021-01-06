// Role Functions
const inquirer = require("inquirer");
const mysql = require("mysql");
const connection = require('./connection')


module.exports = {
    //This will get a list of all roles used at varioucs times
    getAllRoles: function (callback) {  
    const sql = 'SELECT r.id, r.title, r.salary as salary, d.name as department FROM role as r \
                 LEFT JOIN department as d ON r.department_id = d.id ORDER BY title';
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
    
    //SQL to add role
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
    inqAddChgRole: function (vals,depts,callback) {
        let roleDef = {'title':'','salary':0,'deptForRole':0,'currRole':0}
        let roleVals = vals[0];
        let currDept;
        if(vals.length > 0){
          // this goes and gets the index (department Number) - for the current department
          if(roleVals.department){
          let currDept = depts.findIndex((object) => {
           return object["name"] == roleVals.department })
          //This adds a checkbox so our original department is default 
          depts[currDept].checked = true;
          } else {let currDept=""};
          roleDef = {'title':roleVals.title,'salary': roleVals.salary,'deptForRole':currDept,'currRole':roleVals.id}
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
            type: 'checkbox',
            name: 'deptForRole', 
            message: 'Choose Department associated with this role',
            pageSize: 15, 
            choices: depts,
            validate: function(answer) {
              if (answer.length != 1) {
                return 'You must choose only one';
              }
              return true; 
              }
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
    currRoles.push({'name':'Exit - do not select any','value': 'none'});
    
      inquirer.prompt({
          type: 'checkbox',
          name: 'roleSel', 
          message: 'Select role',
          pageSize: 15,
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