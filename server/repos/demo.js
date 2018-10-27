var db = require('../config/db');

exports.loadAll = () => {
	var sql = 'select * from city';
	return db.load(sql);

	
};
