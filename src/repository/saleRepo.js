var postSchema = require('../models/post');

exports.getPostsList = (limit, skip) => {
	return new Promise((resolve, reject) => {
		postSchema.find().limit(limit).skip(skip).exec(function(err, posts) {
			if (err) {
				reject(err);
			} else {
				resolve(posts);
			}
		});
	});
}

exports.getCount = () => {
	return new Promise((resolve, reject) => {
		postSchema.count({}).exec(function(err, count) {
			if (err) {
				reject(err);
			} else {
				resolve(count);
			}
		});
	});
}