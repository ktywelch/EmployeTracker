//const cTable = require('console.table');
const inquirer = require('inquirer')
const actions = require("./lib/actions");
const mysql = require("mysql");
const scripts = require('./lib/sqlscripts');
const d = require('./lib/department')
const e = require('./lib/employee')
const r = require('./lib/role')
const c = require('./lib/company')
const connection = eval(require('./lib/connection'));

 const mainMenu = () => {
    let currDepts = [];
    let currRoles = [];
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
            // This is the inquirer function
            d.inqDept( deptName => {
              //This is the add department with sql
              d.addDept(deptName, (res) => {
                console.log(res);
              });
              mainMenu();
            })
            break;
          case "Add Role":
            console.clear();
            // This is the inquirer function
            d.getAllDept( data => {
              data.forEach(e => {
                currDepts.push({'name': e.name,'value': e.id})
              });
              r.inqAddRole( currDepts, roleName => {
                //This is the add department with sql
                  console.log(roleName);
                r.addRole(roleName, (res) => {

                 console.log(res);
                });
              mainMenu();
             })
           })
           break;
          case "Add Employee":
            console.clear();
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
          case "Update Employee Roles":
          break;
          case "Update Employee Manager":
          break;
          case "Delete Department":
            console.clear();
            d.getAllDept( data => {
              data.forEach(e => {
                currDepts.push({'name': e.name,'value': e.id})
              });
               //console.log(data);
               d.selDept(currDepts, res => {
                  d.delDept(res, (delD) => {
                    console.log(delD);
                    mainMenu();
                  })
                }) 
              });
              //mainMenu();
          break;
          case "Delete Role":
            console.clear();
            r.getAllRoles(data => {
               console.log(data);
                data.forEach(e => {
                  currRoles.push({'name': e.title + " Department: " + e.department,'value': e.id})
                });
                console.log(currRoles);
               r.selRole(currRoles, res => {
                  r.delRole(res, (delD) => {
                    console.log(delD);
                    mainMenu();
                  })
                }) 
              });
          break;
          case "Delete Employee":
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
