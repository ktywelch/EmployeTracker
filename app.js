/*Naming convntions for the routines:
inq - inquirer function
add - sql add function
del - sql delete function
sel - sql select function
upd - sql update function
*/
const inquirer = require('inquirer')
const actions = require("./lib/actions");
const mysql = require("mysql");
const d = require('./lib/department')
const e = require('./lib/employee')
const r = require('./lib/role')
const c = require('./lib/company')
const connection = eval(require('./lib/connection'));

 const mainMenu = () => {
    let currDepts = [], currRoles = [], currEmps = [];
    //Manager is not always required adding null to choices
    currMgrs = [{'name': 'No Manager Required','value': 0}];
    let deptDef;
    inquirer
      .prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: actions
      })
      .then((userResponse) => {
        switch (userResponse.action) {
          case "Add Department":
            console.clear();
            deptDef = "";
            d.inqDept( deptDef,deptName => {
              d.addDept(deptName[0], (res) => {
              });
              mainMenu();
            })
            break;
          case "Add Role":
            console.clear();
            d.getAllDept( data => {
              data.forEach(e => {
                currDepts.push({'name': e.name,'value': e.id})
              });
              r.inqAddRole( currDepts, roleName => {
                r.addRole(roleName, (res) => {
                });
              mainMenu();
             })
           })
           break;
          case "Add Employee":
          console.clear();
            e.getManagers( data1 => {
              data1.forEach(el => {
                currMgrs.push({'name': el.manager + "\n\t" + el.title + ", " + el.department,'value': el.id})
              });
             r.getAllRoles( data => {
               data.forEach(e => {
               currRoles.push({'name': e.title + " \n\tDepartment: " + e.department,'value': e.id})
               });
               //inquirer Employee
               e.inqAddEmployee(currRoles,currMgrs,addData =>{
                 e.addEmployee(addData, res =>{
                   console.log(res);
                 })
                 mainMenu();
               }) 
            })
          })
          break;
          case "View Departments":
          console.clear();
          d.getAllDept( data => {
            console.table(data);
            mainMenu();
          });
          break;
          case "View Roles":
            console.clear();
            r.getAllRoles( data => {
              console.table(data);
              mainMenu();
            });
          break;
          case "View Employees by Manager":
            console.clear();
            e.getAllEmployees( data => {
              console.table(data);
              mainMenu();
            });
          break;
          case "Update Employee":
          break;

          case "Update Department":
            console.clear();
            d.getAllDept( data => {
              data.forEach(e => {
                currDepts.push({'name': e.name,'value': e.id})
              });
               d.selDept(currDepts, vals => { 
                d.inqDept( vals,deptName => {
                  d.updDept(deptName[0],vals.value, res => {
                    mainMenu();
                  })
                }) 
              })
            })
          break;
          case "Update Role":
          break;
          case "Delete Department":
            console.clear();
            d.getAllDept( data => {
              data.forEach(e => {
                currDepts.push({'name': e.name,'value': e.id})
              });
               d.selDept(currDepts, res => {
                  d.delDept(res.value, delD => {
                    mainMenu();
                  })
                }) 
              });
              //mainMenu();
          break;
          case "Delete Role":
            console.clear();
            r.getAllRoles(data => {
               //console.log(data);
                data.forEach(e => {
                  currRoles.push({'name': e.title + " Department: " + e.department,'value': e.id})
                });
                //console.log(currRoles);
               r.selRole(currRoles, res => {
                 console.log("aaaaaa",res);
                  let sel = res.deptSel
                  r.delRole(sel, delD => {
                    console.log("bbbb",delD);
                    mainMenu();
                  })
                }) 
              });
          break;
          case "Delete Employee":
            e.getAllEmployees( data => {
              data.forEach(e => {
                currEmps.push({'name': `${e.Employee}  - ${e.Role} in ${e.Department}` , 'value': e.id})
              });
              e.selEmployee(currEmps, res => {
                e.delEmployee(res, (delD) => {
                  mainMenu();
                })
              })
            })            
          break;
          case "View Department Budget":
          break;
                                     
          default:
            connection.end();
            process.exit(0);
          
        }
      });
  };


mainMenu();
