const express = require('express');
const saleRepo = require('../repository/saleRepo');
const router = express.Router();
const posts_per_page = 1;
const max_page = 9;

router.get('/sale', function(req, res) {
	var page = +req.query.page;
	if (!page) {
		page = +1;
	}
	var skip_item = posts_per_page * (page - 1);
	var posts = saleRepo.getPostsList(posts_per_page, skip_item);
	var count = saleRepo.getCount();
	Promise.all([posts, count]).then(([posts, count]) => {
		var nPages = count/posts_per_page;
		if (count%posts_per_page !== 0) {
			nPages++;
		}
		var nums = [];
		var i = 1;
		if (nPages > max_page) {
			if (nPages - page < max_page/2) {
				i = nPages - max_page + 1;
			} else if (page < max_page/2 + 1) {
				i = 1;
			} else {
				i = page - max_page/2;
			}
			for (; i <= max_page; i++) {
				nums.push({
					val: i,
					isCurPage: i === page
				});
			}
		} else {
			for (; i <= nPages; i++) {
				nums.push({
					val: i,
					isCurPage: i === page
				});
			}
		}
		
		res.render('sale', {
			posts: posts,
			pageNums: nums,
			prevPage: page - 1,
			nextPage: page + 1,
			lastPage: nPages,
			isEmpty: count === 0,
			isPrevPageActive: page !== 1,
			isNextPageActive: page !== nPages
		});
	});
});

module.exports = router;