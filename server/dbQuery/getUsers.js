var db = require('../config/db');

exports.loadAll = () => {
	var sql = 'select * from user';
	return db.load(sql);
};

exports.findUser = (username) => {
	var sql = 'select * from world.user where username = "'+ username +'"';
	return db.load(sql);
};

exports.findUserByID = (id) => {
	var sql = 'select * from world.user where id = "'+ id +'"';
	return db.load(sql);
};

exports.addUser = (firstname, lastname, email, auth, username, password) => {
	var sql = 'insert into world.user value ("'+ 2566 +'","'+ firstname +'","'+ lastname +'","' + username +'","'+ email +'","'+ auth +'","' + password +'")';
	return db.load(sql);
};

exports.Update = (id, firstname, lastname, email, auth, username, password) => {
	var sql = 'update world.user set firstname =  "'+ firstname + '", lastname =  "'+ lastname + '", username = "'+ username +'", email = "' + email + '", auth = "'+ auth + '", password = "' + password +'"';
	return db.load(sql);
};