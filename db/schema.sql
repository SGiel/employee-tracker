DROP DATABASE IF EXISTS employee_db;
DROP TABLE IF EXISTS departments;
DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS roles;

CREATE DATABASE employee_db;
USE employee_db;

CREATE TABLE departments (
    id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE roles (
    id INT(11) NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT,
    PRIMARY KEY (id),
    CONSTRAINT fk_department 
        FOREIGN KEY (department_id) 
        REFERENCES departments(id) 
        ON UPDATE CASCADE 
        ON DELETE SET NULL
);

CREATE TABLE employees (
    id INT(11) NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT,
    PRIMARY KEY (id),
        CONSTRAINT fk_role 
        FOREIGN KEY (role_id) 
        REFERENCES roles(id) 
        ON UPDATE CASCADE 
        ON DELETE SET NULL
);
