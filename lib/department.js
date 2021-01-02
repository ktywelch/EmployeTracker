//Department Functions
const inquirer = require("inquirer");
const util = require("util");
const fs = require("fs");
const mysql = require("mysql");
const scripts = require('./sqlscripts');
const connection = eval(require('./connection'))

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
    const sql = 'DELETE FROM department WHERE (id) IN (?)'; 
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
         msg = `Department Added`;
         callback(msg); 
       });
    },

    updDept: function (dept,id,callback) {  
        let msg;
        const sql = 'UPDATE department SET name = ? where id = ?';
        connection.query(sql, [dept,id], function(err, data) {
            if (err) throw err;
             let data1 = JSON.parse(JSON.stringify(data));             
             msg = 'Deparment Updated';
             callback(msg); 
           });
        },

//inquirer lets you add what needs will need to add validation to make sure it is not empty
inqDept: function (defaults, callback) {
    console.log("defName...",defaults)
    let defName, idNumber;
    if(defaults.length > 0){
        defName = defaults.name;
        idNumber = defaults.value;
    } 
    inquirer.prompt({
        type: 'input',
        name: 'deptName', 
        message: 'Enter the Name of Department', 
        default: defName
        })
    .then(({deptName}) => {
        callback([deptName,idNumber])
    }) 
    .catch(error => {
        console.log("error", error)
        })
    },

    //function to show a list of departs to select from
    selDept: function (depts, callback) {
        let selD;
        inquirer.prompt({
            type: 'checkbox',
            name: 'deptSel', 
            message: 'Select Department',
            choices: depts,
            validate: function(answer) {
                if (answer.length != 1) {
                  return 'You must choose only one';
                }
                return true; 
                }
            })      
        .then((ans) => {
            //console.log(ans);
            selD = depts.find(element => { if(element.value == ans.deptSel){return(element)}})  
            callback(selD)
        }) 
        .catch(error => {
            console.log("error from inquirer", error)
            })
        }
    }
