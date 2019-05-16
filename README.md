# bamazon
This app takes in customer orders using node.js and updates inventory (MySQL) when a product is ordered.

## Demo:
<link goes here>

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

## JavaScript Files

* bamazonCustomer.js - the user can run this file in node to view all products in our MySQL database, and order any products with the quantities available.

* bamazonManager.js - the user can run this file in node to view all products, check for low inventory, order quantities for current products, and add any new products to the MySQL database.
