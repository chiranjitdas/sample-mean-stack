'use strict';

const Product = require('../models/product.model');

exports.findAll = function (req, res) {
	Product.findAll(function (err, products) {
		//console.log('controller')
		if (err) {
			// res.send(err);
			//console.log('err', err)
			res.status(500).json({
				"Error": {
					ErrorCode: 1,
					ErrorMessage: "Something wrong while retrieving products."
				}
			});
		}

		//console.log('res', products);
		// res.json({ error: false, message: "Get Products!", data: products });
		res.status(200).json({
			'timestamp': new Date().getTime(),
			'Status': 1,
			'products': products
		});
	});
};


exports.create = function (req, res) {
	//console.log('req.body', req.body);
	//handles null error
	if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
		res.status(400).send({ error: true, message: 'Please provide all required field' });
	} else {
		const new_product = new Product(req.body);
		Product.create(new_product, function (err, product) {
			if (err) {
				res.status(500).json({
					"Error": {
						ErrorCode: 1,
						ErrorMessage: "Something wrong while adding the product."
					}
				});
			}
			res.status(200).json({
				'timestamp': new Date().getTime(),
				'Status': 1,
				'message': "Product added successfully!",
				'product_id': product
			});
		});
	}
};


exports.findById = function (req, res) {
	Product.findById(req.params.id, function (err, product) {
		if (err) {
			res.status(500).json({
				"Error": {
					ErrorCode: 1,
					ErrorMessage: "Something wrong while retrieving the product."
				}
			});
		}
		res.status(200).json({
			'timestamp': new Date().getTime(),
			'Status': 1,
			'product': product[0]
		});
	});
};


exports.update = function (req, res) {
	if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
		res.status(400).send({ error: true, message: 'Please provide all required field' });
	} else {
		Product.update(req.params.id, new Product(req.body), function (err, product) {

			if (err) {
				res.status(500).json({
					"Error": {
						ErrorCode: 1,
						ErrorMessage: "Something wrong while retrieving the product."
					}
				});
			}
			//console.log('product', product);
			res.status(200).json({
				'timestamp': new Date().getTime(),
				'Status': 1,
				'message': 'Product successfully updated',
				'id': req.params.id
			});
		});
	}

};


exports.delete = function (req, res) {
	Product.delete(req.params.id, function (err, product) {
		if (err)
			res.send(err);
		res.json({ error: false, message: 'Product successfully deleted' });
	});
};
