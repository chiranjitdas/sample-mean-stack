'user strict';
var dbConn = require('../../config/db.config');

//Product object create
var Product = function (product) {
	this.name = product.name;
	this.description = product.description;
	this.price = product.price;
	this.status = product.status ? product.status : 1;
	this.created_at = new Date();
	this.updated_at = new Date();
};
Product.create = function (newEmp, result) {
	dbConn.query("INSERT INTO products set ?", newEmp, function (err, res) {
		if (err) {
			//console.log("error: ", err);
			result(err, null);
		}
		else {
			//console.log(res.insertId);
			result(null, res.insertId);
		}
	});
};
Product.findById = function (id, result) {
	dbConn.query("Select * from products where id = ? ", id, function (err, res) {
		if (err) {
			//console.log("error: ", err);
			result(err, null);
		}
		else {
			result(null, res);
		}
	});
};
Product.findAll = function (result) {
	dbConn.query("Select * from products", function (err, res) {
		if (err) {
			//console.log("error: ", err);
			result(null, err);
		}
		else {
			//console.log('products : ', res);
			result(null, res);
		}
	});
};
Product.update = function (id, product, result) {
	dbConn.query("UPDATE products SET name=?,price=? WHERE id = ?", [product.name, product.price, id], function (err, res) {
		if (err) {
			//console.log("error: ", err);
			result(null, err);
		} else {
			result(null, res);
		}
	});
};
Product.delete = function (id, result) {
	dbConn.query("DELETE FROM products WHERE id = ?", [id], function (err, res) {
		if (err) {
			//console.log("error: ", err);
			result(null, err);
		}
		else {
			result(null, res);
		}
	});
};

module.exports = Product;
