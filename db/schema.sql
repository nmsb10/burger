CREATE DATABASE burgers_db;

USE burgers_db;

CREATE TABLE burgers(
	id int(9) NOT NULL AUTO_INCREMENT,
	burger_name varchar(100) NOT NULL,
	devoured BOOLEAN NOT NULL DEFAULT false,
	date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (id)
);