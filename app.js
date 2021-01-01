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
              r.inqRole( data, roleName => {
                //This is the add department with sql
                r.addRole(roleName, (res) => {
                 //console.log(res);
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
          break;
          case "Update Employee Roles":
          break;
          case "Update Employee Manager":
          break;
          case "Delete Department":
            console.clear();
            let currDepts=[];
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
            let currRoles = [];
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
            break;
        }
      });
  };


mainMenu();
