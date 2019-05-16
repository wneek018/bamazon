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
    // start inquirer
    showOptions();
});

function showOptions() {
    inquirer.prompt({
        name: "managerOptions",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View Products for Sale",
            "View Low Inventory",
            "Add to Inventory",
            "Add New Product",
            "Exit \n"
        ]
    }).then(function (answer) {
        //console.log("You've chosen to " + answer.managerOptions);
        switch (answer.managerOptions) {
            case "View Products for Sale":
                viewProducts();
                break;

            case "View Low Inventory":
                viewInventory();
                break;

            case "Add to Inventory":
                addInventory();
                break;

            case "Add New Product":
                // addNewProduct();
                break;

            case "Exit":
                connection.end();
                break;
        }
    });
}

function viewProducts() {
    console.log("Viewing all products for sale: \n");
    var promise = new Promise(function (resolve, reject) {
        connection.query("SELECT * FROM products", function (err, res) {
            if (err) throw err;
            for (var i = 0; i < res.length; i++) {
                console.log(
                    "Item ID: " + res[i].item_id + "\n" +
                    "Product Name: " + res[i].product_name + "\n" +
                    "Price: " + res[i].price + "\n" +
                    "Quantity: " + res[i].stock_quantity + "\n"
                );
            }
            resolve();
        });
    })
    return promise;
}

function viewInventory() {
    console.log("Products with Low Inventory: \n");
    connection.query("SELECT * FROM products WHERE stock_quantity < 5", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(
                "Item ID: " + res[i].item_id + "\n" +
                "Product Name: " + res[i].product_name + "\n" +
                "Price: " + res[i].price + "\n" +
                "Quantity: " + res[i].stock_quantity + "\n"
            );
        }
    });
}

function updateInv() {
    inquirer.prompt([
        {
            type: "input",
            name: "productId",
            message: "What is the product ID of the item you want to restock?"
        },
        {
            type: "input",
            name: "quantity",
            message: "How many units would you like to add?"
        }
    ]).then(function (answer) {
        connection.query("SELECT * FROM products", function (err, res) {
            if (err) throw err;
            var chosenProduct = "";
            for (var i = 0; i < res.length; i++) {
                if (res[i].item_id === parseInt(answer.productId)) {
                    chosenProduct = res[i];
                }
            }
            connection.query("UPDATE products SET ? WHERE ?", [
                {
                    stock_quantity: (chosenProduct.stock_quantity + parseInt(answer.quantity))
                },
                {
                    item_id: chosenProduct.item_id
                }
            ], function (err, res) {
                if (err) throw err;
                console.log(chosenProduct.product_name + " inventory line updated.");
            })
        });
    });
    showOptions();
}

function addInventory() {
    // make sure the updateInv() starts AFTER running the viewProducts function
    viewProducts().then(updateInv);
}