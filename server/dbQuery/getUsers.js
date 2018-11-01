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



exports.addUser = (name, email, auth, username, password, isDelete) => {
	var sql = 'insert into world.user value (default,"'+ name +'","'+ email +'","' + auth +'","'+ username +'","'+ password +'",default,"' + isDelete + '")';
	return db.load(sql);
};

exports.Update = (id, name, email, auth, username, password) => {
	var sql = 'update world.user set name =  "'+ name + '", email =  "'+ email + '", auth = '+ auth +', username = "' + username + '" where id = '+ id;
	return db.load(sql);
};