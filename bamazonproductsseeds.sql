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

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("running shoes", "sports & outdoors", 75.00, 10),
("cashew snack pack", "food & beverage", 2.50, 25),
("kleenex", "home & kitchen", 3.00, 50),
("marbles", "games & entertainment", 5.25, 15),
("pens", "office", 3.50, 20),
("paper", "office", 2.25, 20),
("gps watch", "sports & outdoors", 149.99, 5),
("pretzels", "food & beverage", 2.00, 30),
("beef jerky", "food & beverage", 4.95, 20),
("toothpaste", "beauty", 3.15, 20);

USE bamazonDB;

SELECT * FROM products;