var db = require('../config/db');

var demo = exports.loadAll = () => {
	var sql = 'select * from city';
	return db.load(sql);
}

module.exports = demo;
