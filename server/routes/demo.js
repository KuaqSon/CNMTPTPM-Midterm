var express = require('express');
var productRepo = require('../repo/demo');

var router = express.Router();

router.get('/', (req, res) => {
	productRepo.loadAll()
		.then(rows => {
			res.json(rows);
		}).catch(err => {
			console.log(err);
			res.statusCode = 500;
			res.end('View error log on console');
		})
})

module.exports = router;