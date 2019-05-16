var mysql = require('mysql');
var inquirer = require('inquirer');
require("dotenv").config();

var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: 3306
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    // show all products in MySQL database
    showProducts();
});

function showProducts() {
    console.log("Products Available: \n");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log("Item ID: " + res[i].item_id + "\n" +
            "Product Name: " + res[i].product_name + "\n" +
            "Price: " + res[i].price + "\n");
        }
        // prompt the user for the product and quantity they want to order
        //placeOrder();
    });
}