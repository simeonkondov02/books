CREATE DATABASE booksdb;

CREATE TABLE books (
	id int auto_increment primary key,
	title varchar(45),
	description varchar(225),
	cover varchar(45),
	price DECIMAL(10,2)
);
