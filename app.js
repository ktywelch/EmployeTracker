/*Naming conventions for the external functions routines:
inq - inquirer function
sel - inquirer function to select choice
add - sql add function
del - sql delete function
get - sql select function
upd - sql update function
*/
const inquirer = require('inquirer')
const actions = require("./lib/actions");
const mysql = require("mysql");
const d = require('./lib/department')
const e = require('./lib/employee')
const r = require('./lib/role')
const connection = require('./lib/connection');

//print the logo - based on the contents from package.json

const logo = require('asciiart-logo');
const config = require('./package.json');
console.log(logo(config).render());

let currDepts = [], currRoles = [], currEmps = [];

const getDepartments = () => {
  d.getAllDept( data => {
    data.forEach(e => {
     currDepts.push({'name': e.name,'value': e.id})
   });
 })
 return currDepts;
}

const getManagers = () => {
  let currMgrs = [{'name': 'No Manager Required','value': 0}];
  e.getManagers( data1 => {
    data1.forEach(el => {
      currMgrs.push({'name': el.manager + "\n\t" + el.title + ", " + el.department,'value': el.id})
    })
   })
return currMgrs;
}

const getRoles = () => {
  r.getAllRoles( data => {
    data.forEach(e => {
    currRoles.push({'name': e.title + "\n\tDepartment: " + e.department,'value': e.id})
    }); 
   })
   return currRoles;
}

const getEmployees = () => {
  e.getAllEmployees( data => {
    data.forEach(e => {
      currEmps.push({'name': e.first_name + " " + e.last_name + " - " + e.Role + " in " + e.Department, 'value':  e.EmployeeID})
       })
     })
  return currEmps;

}

const mainMenu = async () => {
//This section make sure we have updated infromation each time mainMenu called
currMgrs = await getManagers();
currRoles = await getRoles();
currEmps = await getEmployees();
currDepts = await getDepartments();
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
        d.inqDept( '',deptName => {
          d.addDept(deptName[0], (res) => {
          });
          mainMenu();
        })
        break;
      case "Add Role":
        console.clear();
        r.inqAddChgRole('',currDepts, roleDet => {
            //because same inq used for add and update need to pop off last value or query will fail
            roleDet.pop()
            r.addRole(roleDet, (res) => {});
              mainMenu();
        })     
        break;
      case "Add Employee":
        console.clear();
        //inquirer Employee - no default values since this is a new Employee
        e.inqAddChgEmployee("",currRoles,currMgrs,addData =>{
          addData.pop();
            e.addEmployee(addData, res =>{ //console.log(res);
             })
          mainMenu();
          }) 
        break;
      case "View Departments":
        console.clear();
        d.getAllDept( data => {
            console.clear();
            console.table(data);
            mainMenu();
          });
        break;
      case "View Roles":
        console.clear();
        r.getAllRoles( data => {
           console.clear();
           console.table(data);
           mainMenu();
          });
        break;
      case "View Employees by Manager":
        console.clear();
        e.getAllEmployees( data => {
            console.clear();
            console.table(data);
            mainMenu();
        });
        break;
      case "Update Employee":
        console.clear();
        //need to call the get employees to populate the defaults
         e.getAllEmployees( data => {
          e.selEmployee(currEmps, defVal => {
            console.log("here");
            // This filters data to return the employee selected and passes to inq as defaults
            let lp = data.filter((object) => {
            return object["EmployeeID"] == defVal})
            //console.log(lp);
            e.inqAddChgEmployee(lp,currRoles,currMgrs,addData =>{
              e.updEmployee(addData, res =>{})
                mainMenu();
              }) 
            })
          })       
          break;
          case "Update Department":
            console.clear();
            d.selDept("upd",currDepts, vals => { 
                d.inqDept(vals,deptName => {
                  d.updDept(deptName[0],vals, res => {
                    mainMenu();
                  })
                }) 
              })
          break;
          case "Update Role":
            console.clear();
            r.getAllRoles(data => {
               r.selRole(currRoles, res => {
                  let lp = data.filter((object) => {
                    return object["id"] == res})
                  r.inqAddChgRole(lp,currDepts, roleDet => {
                     r.updRole(roleDet, delD => {
                      mainMenu();
                    })
                }) 
              })
            })
          break;
          case "Delete Department":
            console.clear();
               d.selDept("del",currDepts, vals => {               
                  d.delDept(vals, delD => {
                  })
               mainMenu();
            }) 
              //mainMenu();
          break;
          case "Delete Role":
            console.clear();
               r.selRole(currRoles, res => {
                 console.log(res)
                  r.delRole(res.deptSel, delD => {
                  })
                  mainMenu();                  
                }) 
          break;
          case "Delete Employee":
            console.clear();
            console.log(currEmps);
              e.selEmployee(currEmps, res => {
                e.delEmployee(res, (delD) => {
                  mainMenu();
                })
              })            
          break;
          case "View Selected Department Budgets":
            console.clear();
            d.selDept("bud",currDepts, vals => { 
                e.getAllDeptBudget(vals,resp => {
              console.clear();    
              console.table(resp);
               mainMenu();
                })
            })
          break;                                   
          default:
            connection.end();
            process.exit(0);
        }
      });
  };


mainMenu();
