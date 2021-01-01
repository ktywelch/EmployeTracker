//Company functions like gettin budgets, employees by department
const cTable = require('console.table');
const actions_arr = require("./actions");
const inquirer = require("inquirer");
const util = require("util");
const path = require("path");
const fs = require("fs");
const mysql = require("mysql");
const scripts = require('./sqlscripts');