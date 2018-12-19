var productSchema = require('../models/product');

exports.getProductList = () => {
	return new Promise((resolve, reject) => {
		productSchema.find({}).exec(function(err, products) {
			if (err) {
				reject(err);
			} else {
				resolve(products);
			}
		});
	});
}