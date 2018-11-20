var db = require('../config/db');

exports.loadAll = () => {
	var sql = 'select * from userRefreshTokenExt';
	return db.load(sql);
};

exports.findUserByID = (id) => {
	var sql = 'select * from userRefreshTokenExt where id = "'+ id +'"';
	return db.load(sql);
};
