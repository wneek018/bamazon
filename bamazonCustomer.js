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
        placeOrder();
    });
}

function placeOrder() {
    inquirer.prompt([
        {
            type: "input",
            name: "productId",
            message: "What is the product ID of the item you want to buy?"
        },
        {
            type: "input",
            name: "quantity",
            message: "How many would you like to buy?"
        }
    ]).then(function(answer) {
        connection.query("SELECT * FROM products", function(err, res) {
            if (err) throw err;
            var chosenProduct = "";
            for (var i = 0; i < res.length; i++) {
                if (res[i].item_id === parseInt(answer.productId)) {
                    chosenProduct = res[i];
                }
            }
            // if there is enough quantity, fill the order
            if (chosenProduct.stock_quantity >= parseInt(answer.quantity)) {
                // update the MySQL database
                connection.query("UPDATE products SET ? WHERE ?",[
                    {
                        stock_quantity: (chosenProduct.stock_quantity - parseInt(answer.quantity))
                    },
                    {
                        item_id: chosenProduct.item_id
                    }
                ], function (err, res) {
                    if (err) throw err;
                    // log the affected rows to check mysql connection
                    console.log(res.affectedRows + " products updated.");
                    // show the customer the total cost of their purchase
                    console.log("Your total is $" + (parseInt(answer.quantity) * chosenProduct.price));
                })
                // if there is not enough quantity left, do not fill the request
            } else {
                console.log("We don't have enough in stock to fulfill your request.");
            }
            connection.end();
        });
    });
}