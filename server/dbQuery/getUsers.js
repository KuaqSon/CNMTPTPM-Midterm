var db = require('../config/db');
// auth = 0 => user normal
// auth = 1 => dirver

// state:
// user: 0 nothing - 1: waiting driver - 2: driver catched
// driver: 0 non_active - 1: is activer - 2: catch somebody
exports.loadAll = () => {
	var sql = 'select * from user';
	return db.load(sql);
};

exports.findDriver = () => {
	var sql = 'select * from user where auth = 1 and state = 1';
	return db.load(sql);
}

exports.changeStateDriver = (id, state, latDriver, lngDriver) => {
	var sql = 'update user set state = ' + state + ', lat = ' + latDriver + ', log = ' + lngDriver + ' where id = ' + id;
	return db.load(sql);
}

exports.findUser = (username) => {
	var sql = 'select * from user where username = "' + username + '"';
	return db.load(sql);
};

exports.findUserByID = (id) => {
	var sql = 'select * from user where id = "' + id + '"';
	return db.load(sql);
};



exports.addUser = (name, email, auth, username, password, lat, log) => {
	var sql = 'insert into user value (default,"' + name + '","' + email + '","' + auth + '","' + username + '","' + password + '",default,"",' + lat + ',' + log + ', default, default)';
	return db.load(sql);
};

exports.Update = (id, name, email, auth, username, password) => {
	var sql = 'update user set name =  "' + name + '", email =  "' + email + '", auth = ' + auth + ', username = "' + username + '" where id = ' + id;
	return db.load(sql);
};

exports.deleteUser = (id) => {
	var sql = 'update user set isDelete = 1 where id = ' + id;
	return db.load(sql);
}

exports.loadUser = () => {
	var sql = 'select * from user where isDelete = 0';
	return db.load(sql);
}

