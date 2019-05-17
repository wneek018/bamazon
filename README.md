# bamazon
This app takes in customer orders using node.js and updates inventory (MySQL) when a product is ordered.

## Demo:
https://drive.google.com/file/d/1C60c2Gl-rq3cXk_mhoOYQ6JeW3pRW0_x/view?usp=sharing

## Getting Started:

Add MySQL and inquirer packages in node.
```
var mysql = require("mysql");
var inquirer = require("inquirer");
```

Add your own .env file with the following information:
```
DB_NAME=yourDB
DB_HOST=yourhost
DB_PASS=yourpassword
DB_USER=youruser
```

## Initial MySQL setup
Run this code in MySQL to set up a database and table for your products.
```
DROP DATABASE IF EXISTS bamazonDB;
CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(45) NULL,
    department_name VARCHAR(45) NULL,
    price DECIMAL(10,2) NULL,
    stock_quantity INT NOT NULL,
    PRIMARY KEY (item_id)
);
```
Add some products and information to fill your new table.
```
USE bamazonDB;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("running shoes", "sports & outdoors", 75.00, 10),
("cashew snack pack", "food & beverage", 2.50, 25),
("kleenex", "home & kitchen", 3.00, 50),
("marbles", "games & entertainment", 5.25, 15),
```

## JavaScript Files

* bamazonCustomer.js - the user can run this file in node to view all products in our MySQL database, and order any products with the quantities available.

* bamazonManager.js - the user can run this file in node to view all products, check for low inventory, order quantities for current products, and add any new products to the MySQL database.
