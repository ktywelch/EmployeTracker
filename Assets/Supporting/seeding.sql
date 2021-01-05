DROP DATABASE IF EXISTS company;
CREATE DATABASE company;

USE company;


CREATE TABLE department(
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT null,
  PRIMARY KEY (id)
);



CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(100) NOT NULL,
  salary int(12.2) NOT NULL,
  department_id INT,
  PRIMARY KEY (id),  
  FOREIGN KEY(department_id) REFERENCES department(id) ON DELETE SET NULL
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULl,
  last_name VARCHAR(30) NOT null,
  role_id int,
  manager_id int references employees(id) ON DELETE SET NULL,
  PRIMARY KEY (id),
  FOREIGN KEY(role_id) REFERENCES role(id) ON DELETE SET NULL
);

INSERT INTO  role (title, salary,department_id)
VALUES ("Manager", 55000,2), ("Engineer", 65000,2), ("Developer", 75000,null), ("CEO", 185000,1);

INSERT INTO  department (name) VALUES ("Executive & Administation"),("Information Technoloy"),("Human Resources");


INSERT INTO  employee (first_name, last_name, role_id) values ("John","Smith",1), ("Joanna","Jones",null),("Andrew","Adams",3);


