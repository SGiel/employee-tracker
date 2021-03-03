DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;
USE employee_db;

CREATE TABLE departments (
  id INTEGER(11) AUTO_INCREMENT NOT NULL,
  department_name VARCHAR(30) NULL,
   PRIMARY KEY (id)
);

-- CREATE TABLE role (
--     id INTEGER(11) AUTO_INCREMENT NOT NULL,
--     title VARCHAR(30) NOT NULL,
--     salary DECIMAL NOT NULL,
--     department_id FOREIGN KEY
--     PRIMARY KEY (id)
-- )