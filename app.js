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
              })
              r.inqAddRole('',currDepts, roleName => {
                //because same inq used for add and update need to pop off last value
                roleName.pop()
                r.addRole(roleName, (res) => {
                });
              mainMenu();
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
               //inquirer Employee - no default values since this is a new Employee
               e.inqAddEmployee("",currRoles,currMgrs,addData =>{
                addData.pop();
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
            console.clear();
            e.getManagers( data1 => {
              data1.forEach(el => {
              currMgrs.push({'name': el.manager + "\n\t" + el.title + ", " + el.department,'value': el.id})
              });
             })
            r.getAllRoles( data => {
              data.forEach(e => {
              currRoles.push({'name': e.title + " \n\tDepartment: " + e.department,'value': e.id})
              });
            })
            e.getAllEmployees( data => {
              data.forEach(e => {
                currEmps.push({'name': e.first_name + " " + e.last_name + " - " + e.Role + " in " + e.Department, 'value':  e.EmployeeID})
             });
              e.selEmployee(currEmps, defVal => {
                // This extracts the data for the employee selected and passes to inq as defaults
                let lp = data.filter((object) => {
                  return object["EmployeeID"] == defVal})
                  console.log(lp);
                e.inqAddEmployee(lp,currRoles,currMgrs,addData =>{
                  e.updEmployee(addData, res =>{
                    console.log(res);
                  })
                mainMenu();
              }) 
            })
          })       
          break;
          case "Update Department":
            console.clear();
            d.getAllDept( data => {
              data.forEach(e => {
                currDepts.push({'name': e.name,'value': e.id})
              });
               d.selDept(currDepts, vals => { 
                d.inqDept(vals,deptName => {
                  d.updDept(deptName[0],vals.value, res => {
                    mainMenu();
                  })
                }) 
              })
            })
          break;
          case "Update Role":
            console.clear();
            r.getAllRoles(data => {
                data.forEach(e => {
                  currRoles.push({'name': e.title + " Department: " + e.department,'value': e.id})
                });
              
               r.selRole(currRoles, res => {
                  //console.log("from update",res)
                  let lp = data.filter((object) => {
                    return object["id"] == res})
                    console.log(lp);
                    d.getAllDept( data => {
                      data.forEach(e => {
                        currDepts.push({'name': e.name,'value': e.id})
                      });
                    })
                  r.inqAddRole(lp,currDepts, roleDet => {
                     r.updRole(roleDet, delD => {
                      mainMenu();
                    })
                }) 
              })
            })
          break;
          case "Delete Department":
            console.clear();
            d.getAllDept( data => {
              data.forEach(e => {
                currDepts.push({'name': e.name,'value': e.id})
              });
               d.selDept(currDepts, vals => {
                  d.delDept(vals.value, delD => {
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
               r.selRole(currRoles, res => {
                 console.log(res)
                  r.delRole(res.deptSel, delD => {
                    mainMenu();
                  })
                }) 
              });
          break;
          case "Delete Employee":
            e.getAllEmployees( data => {
              data.forEach(e => {
                currEmps.push({'name':  e.first_name + " " + e.last_name + " - " + e.Role + " in " + e.Department, 'value': e.EmployeeID})
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
