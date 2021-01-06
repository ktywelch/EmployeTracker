# EmployeeTracker

The EmployeeTracker application allows a user to create, read, update and delete Employees, Department and Roles from a company database. This will allow users to interact with the data in a more meaningful way.



[EmployeeTracker application can be found on github repository ](https://github.com/ktywelch/EmployeTracker)

## Table of contents
* [Design](#Design)
* [Installation](#Installation)
* [Usage](#Usage)
* [Technologies](#Technologies)
* [Contributions](#Contributions)
* [License](#License)

##Design
The design employed is to use distributed files containing functions that could be called and referenced by the main app as needed.

###The dependent modules created in the ./lib folder  are:
* actions.js  - variable of actions for the main menu inquirer 
* connection.js - the DB connection parameters
* employee.js - Employee functions and global functions such as budget lists
* role.js - Contains functions to manipulate the company roles
* department.js - Contains functions to work with the departments
* ./Assets/Supporting/seeding.sql - sql script to create the DataBase Schema and to populate two records in each field


###External Function Naming Conventions:
* inq - inquirer function
* sel - inquirer function to select choice
* add - sql add function
* del - sql delete function
* get - sql select function
* upd - sql update function


###Database:

Datamodel utilizes three tables with relationships established through foreign keys-

![Database Schema](Assets/schema.png)

## Installation
Assumptions prior to insallation that the user mysql community edition and MySqlWorkbench (or similar) installed and is familiar with starting mysql services and execute sql from the workbench. For additional details on install MySQL and tools please refer to the ![MySQL Community Edition site.](https://www.mysql.com/products/community/) 

The installation process is a download of git source, using npm install to install required modules based on the package.json file included in the same directory as the application.

The Application has a seeding.sql that can be used to create the database schema and some test records and is located in ./Assets/Supporting/seding.sql. Open the seeding.sql file in MySqlWorkbench to generate the sql. 

You may need to update the connection.js file in ./lib to reflect the port number and password for the MySQL system on your local host.

#Usage
To start the application run:

    node app.js from the base directory

#Technologies
* MySQL Database Server
* MySQL WorkBench
* Node.js
* NPM modules inquirer, mysql, console.table, asciiart-logo

#Contributions - Study peers
* Sam Ayler
* Vincent Gines
* Albert Cheng
* Lucah Endicott

#License
ISC License (ISC)

Copyright 2021 Kathleen WElch

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
