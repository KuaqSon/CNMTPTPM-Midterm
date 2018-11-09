var db = require('../config/db');

exports.loadAll = () => {
	var sql = 'select * from receiver';
	return db.load(sql);
};