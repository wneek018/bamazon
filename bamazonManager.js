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
        message: "What would you like to do? Press return to select.",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
    }).then(function(answer) {
        // switch statement based on their choice
        console.log("You've chosen to " + answer.managerOptions);
        connection.end();
    });
}